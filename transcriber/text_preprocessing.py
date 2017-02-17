import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from pymongo import MongoClient
import os
import json
from contractions import contractions as Cont
import re



Client = MongoClient('localhost', 27017)
Lemma = WordNetLemmatizer()
Pos_tag = nltk.pos_tag


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
											if "word_confidence" in twt["results"][0]["alternatives"][0]]
			self.reduced_twt = [] 
			for twt in self.text_with_time:
				self.reduced_twt += self.extract_word_object(twt)

	def eliminate_contraction(self):
		'''
			does: transform contraction to full words ex: there's -> there is
		'''
		global Cont
		global Pos_tag
		global Lemma
		self.modified_transcript = ""
		reg = re.compile("\s+|\.") #splitted by space and dot
		keys = Cont.keys() 
		for word in reg.split(self.full_transcript):
			if word != "" and word != "\n":
				if word in keys:
					print Cont[word]
					word = Cont[word][0]
					print word
				else:
					tag = Pos_tag([word])[0][1]
					pos_type = "n"
					if tag == "VBR": #is a verb
						pos_type ="v"
					word = Lemma.lemmatize(word, pos=pos_type)
				self.modified_transcript += (" " + word)


	def extract_word_object(self, word_with_time):
		return [{"word": word_info[0], 
				 "time": {"start_time": float(word_info[1]), 
						 "stop_time": float(word_info[2])
						 }
				} for word_info in word_with_time["results"][0]["alternatives"][0]["timestamps"]]

	def compress_twt(self):
		global Pos_tag
		global Cont
		self.compressed_twt = []
		compressed_twt = {}
		for twt in self.reduced_twt:
			word = twt["word"]
			time = twt["time"]
			contraction_keys = Cont.keys()
			if word in contraction_keys:
				new_words = Cont[word][0].split(" ")
				for new_word in new_words:
					compressed_twt.setdefault(new_word, [])
					compressed_twt[new_word].append(time)
			else:
				tag = Pos_tag([word])[0][1] #-> Pos_tag(["geese"]) -> [("geese", "NN")]
				pos_type = "n" #default lemmatize to a nounce
				if tag == "VBR": #is a verb
					pos_type ="v"
				new_word = Lemma.lemmatize(word, pos=pos_type)
				compressed_twt.setdefault(new_word,[])
				compressed_twt[new_word].append(time)
		for key in compressed_twt.keys():
			self.compressed_twt.append({"word": key, "time": compressed_twt[key]})

	def construct_basic_data(self):
		return {"words_with_time": self.compressed_twt, 
				"raw_transcript": self.full_transcript, 
				"processed_transcript": self.modified_transcript}


# x = TextProcessing(1)
# x.read_f_transcript('./output/hypotheses.txt')
# x.read_f_text_time('./output/0.json.txt')
# x.eliminate_contraction()
# x.compress_twt()
# data = x.construct_basic_data()
# f = open("a.txt", "w")
# f.write(json.dumps(data))
