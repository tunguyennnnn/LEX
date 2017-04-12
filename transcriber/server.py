# This is the main entry point for the webserver that implements the basic REST API

from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask("Transcriber")

@app.route('/videos', methods=['POST','PUT'])
def put_video():
	"""
	Method used for placing a new video in the queue to be processed
	Use this by calling 'POST /videos'
	with a JSON object that has a 'video_url' key pointing to a list of URLs
	"""
	raise NotImplementedError("Missing REST API implementation")
#end put_video
	
@app.route('/videos', methods=['GET'])
def get_video():
	"""
	Method used for getting the queue of videos to process
	Use this by calling 'GET /videos'
	Returns a JSON object with the full list of URLs waiting to be processed
	"""
	raise NotImplementedError("Missing REST API implementation")
#end get_video

def run_server(args=None):
	app.run(debug=True)
#end main

if __name__ == '__main__':
	run_server()