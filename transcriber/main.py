# Transcriber main

from multiprocessing import Process as proc
from worker import QueueWorker
from server import run_server

def main(args=None):
	worker_obj = QueueWorker(60.0)
	
	server_proc = Process(target=run_server)
	server_proc.start()
	worker_proc = Process(target=QueueWorker.run, args=(worker_obj,))
	worker_proc.start()
	
	# Join with the 
	server_proc.join()
#end main

if __name__=="__main__":
	main()