# This replaces the streaming websoket interface

import os
import time
import requests

class WatsonResult():
	def __init__(self, video_id, watson_data, result_file):
		self.video_id = video_id
		self.text = watson_data
		self.filename = result_file

class WatsonHTTPWrapper():
	endpoint_url = "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize"

	def __init__(self, video_id, verbose=False, output_dir=os.path.join(os.getcwd(),'output'), data_dir=os.path.join(os.getcwd(),'recordings')):
		self.user = 'user'
		self.password = 'pass'
		
		self.video_id = video_id
		self.use_time = True
		self.verbose = verbose
		self.data = None
		self.out_dir = output_dir
		self.data_dir = data_dir
		
		self.result_reply = None
		self.result_file = None
		self.result_data = None
	#end init
	
	def set_credentials(self, user, password):
		self.user = user
		self.password = password
	#end
	
	def do_request(self):
		start_time = time.time()
	
		self.data = open(os.path.join(self.data_dir,self.video_id+".ogg"),'rb').read()
		request_params = ( ('continuous','true'), ('timestamps', str(self.use_time).lower()) )
		request_header = {'Content-Type':'audio/ogg;codecs=opus'}
		
		self.result_reply = requests.post(WatsonHTTPWrapper.endpoint_url, params=request_params, data=self.data, headers=request_header, auth=(self.user,self.password), timeout=100000)
		
		elapsed = time.time()-start_time
		self.result_data = self.result_reply.text
		
		if self.verbose:
			print(self.result_reply.text)
			
		print("Watson took {} seconds".format(elapsed))
		print("Sending to {}/{}.txt".format(self.out_dir,self.video_id))
		self.result_file = os.path.join(self.out_dir,self.video_id+".txt")
		
		out_file = open(self.result_file,'w')
		out_file.write(self.result_reply.text)
		out_file.close()
		print("Ready to add ID {} to database".format(self.video_id))
	#end do_request
	
	def get_result(self):
		assert(self.result_reply is not None)
		return WatsonResult(self.video_id, self.result_data, self.result_file)
	#end get_result
#end class Watson

if __name__=="__main__":
	# Just for testing purposes
	test_req = WatsonHTTPWrapper('MD_xiokVXwI')
	test_req.set_credentials(os.getenv("USER"),os.getenv("PASS"))
	test_req.do_request()