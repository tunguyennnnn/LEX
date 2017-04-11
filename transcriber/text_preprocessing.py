import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from pymongo import MongoClient
import os
import json
from contractions import contractions as Cont
import re
import summary as SM


Client = MongoClient("mongodb://lex:sjMl7MdpaX9XdeBU@lex-shard-00-00-fv6o5.mongodb.net:27017,lex-shard-00-01-fv6o5.mongodb.net:27017,lex-shard-00-02-fv6o5.mongodb.net:27017/videostext?ssl=true&replicaSet=lex-shard-0&authSource=admin")
VideosTextDb = Client.videostext
CompressedTWTCollection = VideosTextDb.compressedTWT
VideoInfoCollection = VideosTextDb.text_with_time
Lemma = WordNetLemmatizer()
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
	def __init__(self, video_id, video_title, duration = 0, thumbnail_link = "", text_with_time = {}, full_transcript = "", db_name = 'videostext', collection='text_with_time'):
		self.title = video_title
		self.video_id = video_id
		self.db_name = db_name
		self.collection = collection
		self.text_with_time = text_with_time  #format follows what Watson returns
		self.full_transcript = full_transcript
		self.thumbnail_link = thumbnail_link
		self.duration = int(duration)
		self.summarizer = SM.FrequencySummarizer()

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
					word = Cont[word][0]
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
				new_word = Lemma.lemmatize(word, pos=pos_type)
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
				new_word = Lemma.lemmatize(word, pos=pos_type)
				self.compressed_twt.append({"word": new_word, "orginal_word": word,"time": time})

	def construct_basic_data(self):
		return ({"video_id": self.video_id,
				"title": self.title,
				"thumbnail": self.thumbnail_link,
				"duration" : self.duration,
				"words_with_time": self.compressed_twt},
				{"video_id": self.video_id,
				"title": self.title,
				"duration": self.duration,
				"thumbnail": self.thumbnail_link,
				"words_with_time": self.uncompressed_twt,
				"raw_transcript": self.full_transcript,
				"processed_transcript": self.modified_transcript})

	def write_to_db(self):
		global VideosTextDb
		self.eliminate_contraction()
		self.compress_twt()
		processed_twt, basic_twt = self.construct_basic_data()
		CompressedTWTCollection.insert(processed_twt)
		VideoInfoCollection.insert(basic_twt)



# x = TextProcessing("dQw4w9WgXcQ", 'lecture')
# x.read_f_transcript('./output/hypotheses.txt')
# x.read_f_text_time('./output/0.json.txt')
# x.write_to_db()
