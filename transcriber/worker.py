# The worker.py is a recurring task that checks any videos that should be processed

from pymongo import MongoClient
from threading import Timer, Thread
from multiprocessing import Pool
from datetime import datetime
from nltk.stem import WordNetLemmatizer

import time
import os
import traceback

import fetcher
from watson_httpclient import WatsonHTTPWrapper, WatsonResult
from text_preprocessing import TextProcessing
from constants import db_uri

Lemma = WordNetLemmatizer()

def work(item):
	global Lemma  #Shared object that should only be made once
	
	insert_time = item[0]
	video_url = item[1]

	metadata = fetcher.download_video(video_url)
	print("Passing {} to Watson transcriber".format(metadata.id))
	transcriber = WatsonHTTPWrapper(metadata.id)
	transcriber.set_credentials("c480e940-a551-46fb-8194-16822c109ac1","2iyTrMpmANWb")
	transcriber.do_request()

	result = transcriber.get_result()
	print("Inserting {} in database".format(metadata.id))

	# Send it off to be processed and inserted
	processor = TextProcessing(metadata.id, metadata.name, Lemma, metadata.duration, metadata.thumbnail)
	print(result.filename)
	processor.read_f_text_time(result.filename)
	processor.write_to_db()
	print("Completed {} and placed in database. Cleaning up.".format(metadata.id))
	
	#Cleanup the garbage!
	os.remove(metadata.location)
	os.remove(result.filename)
	
	db_connection = MongoClient(db_uri)
	collection = 'video_queue'
	queue_db = db_connection.get_default_database()
	queue_db[collection].delete_many({'video_url':video_url})
	
	print("Cleanup done. Job for {} Complete".format(metadata.id))
	return True
#end work

def safe_work(item):
	try:
		return work(item)
	except Exception as e:
		traceback.print_exc()
		print(e)
		return False
#end 

class QueueWorker():
	def __init__(self, poll_period, worker_pool_num=10):
		self.continue_work = True
		self.period = poll_period
		self.is_waiting = False
		self.timer = None
		self.next_run = None
		
		self.worker_num = worker_pool_num
		self.worker_pool = Pool(worker_pool_num)
	#end
		
	def stop(self, force_halt=False):
		self.continue_work = False
		if force_halt:
			self.worker_pool.terminate()
		else:
			self.worker_pool.close()
	#end stop
	
	def schedule(self):
		# Really hacky stuff
		time.sleep(self.period)
		
		#self.timer = Timer(self.period,QueueWorker.run,args=(self,))
		#self.timer.start()
	#end schedule
	
	def run(self):
		while self.continue_work:
			print("QueueWorker starting at {}".format(datetime.now()))
			# Load the records from mongo
			db_connection = MongoClient(db_uri)
			collection = 'video_queue'
			queue_db = db_connection.get_default_database()
			video_list = list(queue_db[collection].find())
		
			if len(video_list) < 1:
				print("No videos queued")
				# Schedule self again only if it should continue work
				if self.continue_work:
					self.schedule()
			#end if
		
			queue = [(x['insert_time'],x['video_url']) for x in video_list]
			queue.sort()
		
			working_set = queue[:self.worker_num]
			target = safe_work
			results = self.worker_pool.map(target, working_set)
		
			# all returns should be true. will be None in case of failure
			for i in range(len(results)):
				assert(results[i]) # TODO: this is pretty severe. if failed, try to redo or notify
		
			# Schedule self again only if it should continue work
			if self.continue_work:
				self.schedule()
		#end while
	#end run
#end class

if __name__=="__main__":
	worker = QueueWorker(600.0)
	print("STARTING WORKERS")
	worker.run()

	print("Blocking until you press enter")
	input()