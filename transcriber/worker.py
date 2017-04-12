# The worker.py is a recurring task that checks any videos that should be processed

from pymongo import MongoClient
from threading import Timer
from multiprocessing import Pool
from datetime import datetime

import time
import os

import fetcher
#from watson_httpclient import WatsonHTTPWrapper, WatsonResult

db_uri = 'mongodb://localhost/test'

def work(item):
	insert_time = item[0]
	video_url = item[1]

	metadata = fetcher.download_video(video_url)
	transcriber = WatsonHTTPWrapper(metadata.id)
	transcriber.set_credentials("c480e940-a551-46fb-8194-16822c109ac1","2iyTrMpmANWb")
	transcriber.do_request()

	result = transcriber.get_result()
	queue_db = db_connection.get_default_database()
	queue_db.video_data.insert(result.__dict__)

	return True
#end work

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
	
	def __work(item):
		insert_time = item[0]
		video_url = item[1]
		
		metadata = fetcher.download_video(video_url)
		#transcriber = WatsonHTTPWrapper(metadata.id)
		#transcriber.set_credentials("c480e940-a551-46fb-8194-16822c109ac1","2iyTrMpmANWb")
		#transcriber.do_request()
		
		#result = transcriber.get_result()
		video_id = metadata.id
		print("Inserting {} in database".format(video_id))
		filename = os.path.join(os.getcwd(),'output',video_id+".txt")
		
		#result = WatsonResult(metadata.id, open(filename,'r').read(), filename)
		
		db_connection = MongoClient(db_uri)
		queue_db = db_connection.get_default_database()
		queue_db.video_data.insert({'video_id':video_id, 'text':open(filename,'r').read()})
		print("Job Complete")
		return True
	# end __work
		
	def stop(self, force_halt=False):
		self.continue_work = False
		if force_halt:
			self.worker_pool.terminate()
		else:
			self.worker_pool.close()
	#end stop
	
	def run(self):
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
				self.timer = Timer(self.period,QueueWorker.run,args=(self,))
			return
		#end if
		
		queue = [(x['insert_time'],x['video_url']) for x in video_list]
		queue.sort()
		
		working_set = queue[:self.worker_num]
		target = work
		results = self.worker_pool.map(target, working_set)
		
		# all returns should be true. will be None in case of failure
		for i in range(self.worker_num):
			assert(results[i]) # TODO: this is pretty severe. if failed, try to redo or notify
		
		# Schedule self again only if it should continue work
		if self.continue_work:
			self.timer = Timer(self.period,QueueWorker.run,args=(self,))
	#end
#end class

if __name__=="__main__":
	worker = QueueWorker(30.0)
	print("STARTING WORKERS")
	worker.run()
	print("Blocking until you press enter")
	input()