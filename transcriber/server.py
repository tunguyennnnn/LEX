# This is the main entry point for the webserver that implements the basic REST API

from flask import Flask, jsonify, request, abort
from pymongo import MongoClient
from config.settings import DB_URI, PORT

import time

app = Flask("Transcriber")

db_connection = MongoClient(DB_URI)
collection = 'video_queue'

@app.route('/videos', methods=['POST','PUT'])
def put_video():
	"""
	Method used for placing a new video in the queue to be processed
	Use this by calling 'POST /videos'
	with a JSON object that has a 'video_url' key pointing to a list of URLs
	"""
	global db_connection
	
	if not request.json or not 'video_url' in request.json:
		abort(400)
	
	video_list = request.json['video_url']
	if len(video_list) < 1:
		abort(400)
		
	print("Received {}".format(video_list))
	queue_db = db_connection.get_default_database()

	retVal = []
	for a_video in video_list:
		formatted = {'video_url': a_video}
		formatted['insert_time'] = str(time.time())
		queue_db[collection].insert(formatted)
		retVal.append(str(formatted))
	#end for
	
	return jsonify({'new_videos':retVal}), 200
#end put_video
	
@app.route('/videos', methods=['GET'])
def get_video():
	"""
	Method used for getting the queue of videos to process
	Use this by calling 'GET /videos'
	Returns a JSON object with the full list of URLs waiting to be processed
	"""
	queue_db = db_connection.get_default_database()
	elements = queue_db[collection].find()

	retVal = [x['video_url'] for x in elements]
	
	return jsonify({'queued_videos':retVal}), 200
#end get_video

def run_server(args=None):
	app.run(debug=True, host='127.0.0.1', port=PORT)
#end main

if __name__ == '__main__':
	run_server()
