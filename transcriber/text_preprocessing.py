import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from pymongo import MongoClient
from contractions import contractions as Cont
from constants import db_uri

import os
import json
import re
import summary as SM


Pos_tag = nltk.pos_tag
Stop_words = stopwords.words("english")


class TextProcessing:
	'''
		Preprocessing text using:
			- text with timestamp and full transcript
		Does:
			- word frequency
			- stopwords
			- lemmatize words
	'''
	def __init__(self, video_id, video_title, lemma_obj, duration = 0, thumbnail_link = "", text_with_time = {}, full_transcript = "", db_name = 'videostext', collection='text_with_time'):
		self.title = video_title
		self.video_id = video_id
		self.db_name = db_name
		self.collection = collection
		self.text_with_time = text_with_time  #format follows what Watson returns
		self.full_transcript = full_transcript
		self.thumbnail_link = thumbnail_link
		self.duration = int(duration)
		self.summarizer = SM.FrequencySummarizer()
		self.Lemma = lemma_obj

	def read_f_transcript(self, file_path):
		with open(file_path) as transcript_file:
			self.full_transcript = transcript_file.read()

	def read_f_text_time(self, file_path):
		#format follows what Watson returns -> check 0.json.txt for the format
		with open(file_path) as text_time_file:
			data = '[' + text_time_file.read() + ']'
			data = json.loads(data.replace('}{', '},{'))
			self.text_with_time = [twt for twt in data if "word_confidence" in twt["results"][0]["alternatives"][0]]
			self.reduced_twt = []
			self.full_transcript = ""
			for twt in self.text_with_time:
				word_with_time, transcript = self.extract_word_object(twt)
				self.reduced_twt += word_with_time
				if len(transcript.split()) > 2:
					self.full_transcript += " " + transcript + "."

	def eliminate_contraction(self):
		'''
			does: transform contraction to full words ex: there's -> there is
		'''
		global Cont
		global Pos_tag
		
		self.modified_transcript = ""
		reg = re.compile("\s+|\.") #splitted by space and dot
		keys = Cont.keys()
		for word in reg.split(self.full_transcript):
			if word != "" and word != "\n":
				if word in keys:
					word = Cont[word][0]
				else:
					tag = Pos_tag([word])[0][1]
					pos_type = "n"
					if tag == "VBR": #is a verb
						pos_type ="v"
					word = self.Lemma.lemmatize(word, pos=pos_type)
				self.modified_transcript += (" " + word)


	def extract_word_object(self, word_with_time):
		return ([{"word": word_info[0],
				 "time": {"start_time": float(word_info[1]),
						 "stop_time": float(word_info[2])
						 }
				} for word_info in word_with_time["results"][0]["alternatives"][0]["timestamps"]],
				word_with_time["results"][0]["alternatives"][0]["transcript"].strip().replace('%HESITATION', ""))

	def compress_twt(self):
		global Pos_tag
		global Cont
		self.compressed_twt = []
		self.uncompressed_twt = []
		compressed_twt = {}
		for twt in self.reduced_twt:
			word = twt["word"]
			time = twt["time"]
			contraction_keys = Cont.keys()
			if word in contraction_keys:
				self.uncompressed_twt.append({"word": word, "original_word": word, "time": time})
			else:
				tag = Pos_tag([word])[0][1] #-> Pos_tag(["geese"]) -> [("geese", "NN")]
				pos_type = "n" #default lemmatize to a nounce
				if tag.find("VB") != -1: #is a verb
					pos_type ="v"
				new_word = self.Lemma.lemmatize(word, pos=pos_type)
				if not word in Stop_words:
					compressed_twt.setdefault(new_word,[])
					compressed_twt[new_word].append(time)
				self.uncompressed_twt.append({"word": new_word, "orginal_word": word,"time": time})
		for key in compressed_twt.keys():
			self.compressed_twt.append({"word": key, "time": compressed_twt[key]})

	def compress_twt_v2(self):
		global Pos_tag
		global Cont
		self.compressed_twt = []
		for twt in self.reduced_twt:
			word = twt["word"]
			time = twt["time"]
			contraction_keys = Cont.keys()
			if word in contraction_keys:
				new_words = Cont[word][0].split(" ")
				for new_word in new_words:
					self.compressed_twt.append({"word": new_word, "original_word": word, "time": time})
			else:
				tag = Pos_tag([word])[0][1] #-> Pos_tag(["geese"]) -> [("geese", "NN")]
				pos_type = "n" #default lemmatize to a nounce
				if tag.find("VB") != -1: #is a verb
					pos_type ="v"
				new_word = self.Lemma.lemmatize(word, pos=pos_type)
				self.compressed_twt.append({"word": new_word, "orginal_word": word,"time": time})

	def construct_basic_data(self):
		summary = " ".join(SM.FrequencySummarizer().summarize(self.full_transcript, int(len(self.full_transcript.split(".")) * 0.1)))
		return ({"video_id": self.video_id,
				"title": self.title,
				"thumbnail": self.thumbnail_link,
				"duration" : self.duration,
				"summary" : summary,
				"words_with_time": self.compressed_twt},
				{"video_id": self.video_id,
				"title": self.title,
				"duration": self.duration,
				"summary" : summary,
				"thumbnail": self.thumbnail_link,
				"words_with_time": self.uncompressed_twt,
				"raw_transcript": self.full_transcript,
				"processed_transcript": self.modified_transcript})

	def write_to_db(self):
		Client = MongoClient(db_uri)
		VideosTextDb = Client.videostext
		CompressedTWTCollection = VideosTextDb.compressedTWT
		VideoInfoCollection = VideosTextDb.text_with_time
		self.eliminate_contraction()
		self.compress_twt()
		processed_twt, basic_twt = self.construct_basic_data()
		CompressedTWTCollection.insert(processed_twt)
		VideoInfoCollection.insert(basic_twt)
#end class TextProcessing

if __name__=="__main__":
	Lemma = WordNetLemmatizer()
	x = TextProcessing("dQw4w9WgXcQ", 'lecture', Lemma)
	x.read_f_text_time('./output/pvjPzsLIyGw.txt')
	x.write_to_db()
