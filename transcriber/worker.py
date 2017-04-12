# The worker.py is a recurring task that checks any videos that should be processed

from pymongo import MongoClient
from Threading import Timer
from multiprocessing import Pool

class QueueWorker():
	def __init__(self, poll_period, worker_pool=10):
		self.continue_work = True
		self.period = poll_period
		self.is_waiting = False
		self.timer = None
	#end
	
	def __work(self):
		raise NotImplementedError
		
	def stop(self):
		self.continue_work = False
		raise NotImplementedError
	
	def run(self):
		# TODO: check the Mongo database and spawn workers
		raise NotImplementedError
		
		# Schedule self again only if it should continue work
		if self.continue_work:
			self.timer = Timer(self.period,QueueWorker.run,args=(self,))
	#end
#end class