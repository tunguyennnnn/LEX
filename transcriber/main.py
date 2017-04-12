# Transcriber main

from multiprocessing import Process as proc
from worker import QueueWorker
from server import run_server

def main(args=None):
	worker_obj = QueueWorker(10.0)
	worker_obj.schedule()
	
	server_proc = proc(target=run_server)
	server_proc.start()
	
	worker_proc = proc(target=QueueWorker.run, args=(worker_obj,))
	worker_proc.start()
	
	# Join with the 
	server_proc.join()
	worker_obj.stop()
#end main

if __name__=="__main__":
	main()