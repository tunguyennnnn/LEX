import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from pymongo import MongoClient
import os
import json


client = MongoClient('localhost', 27017)
lemma = WordNetLemmatizer()

class TextProcessing:
	'''
		Preprocessing text using:
			- text with timestamp and full transcript
		Does:
			- word frequency
			- stopwords
			- lemmatize words
	'''
	def __init__(self, video_id, text_with_time = {}, full_transcript = "", db_name = 'videostext', collection='text_with_time'):
		self.video_id = id
		self.db_name = db_name
		self.collection = collection
		self.text_with_time = text_with_time  #format follows what Watson returns
		self.full_transcript = full_transcript

	def read_f_transcript(self, file_path):
		with open(file_path) as transcript_file:
			self.full_transcript = transcript_file.read()

	def read_f_text_time(self, file_path):
		#format follows what Watson returns -> check 0.json.txt for the format
		with open(file_path) as text_time_file:
			data = '[' + text_time_file.read() + ']'
			data = json.loads(data.replace('}{', '},{'))
			self.text_with_time = [twt for twt in data 
											if twt["results"][0]["alternatives"][0].has_key("word_confidence")]
			self.reduced_twt = [] 
			for twt in self.text_with_time:
				self.reduced_twt += self.extract_word_object(twt)

	def extract_word_object(self, word_with_time):
		return [{"word": word_info[0], 
				 "time": {"start_time": float(word_info[1]), 
						 "stop_time": float(word_info[2])
						 }
				} for word_info in word_with_time["results"][0]["alternatives"][0]["timestamps"]]

	def wordnet_processing(self):
		global lemma
		self.wordnet = {}
		for word_obj in self.reduced_twt:
			lemma_word = lemma.lemmatize(word_obj["word"])
			self.wordnet.setdefault(lemma_word, 0)
			self.wordnet[lemma_word] += 1
		print self.wordnet



# x = TextProcessing(1)
# x.read_f_transcript('./output/hypotheses.txt')
# x.read_f_text_time('./output/0.json.txt')
# x.wordnet_processing()
