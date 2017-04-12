import os
import sys
from youtube_dl import YoutubeDL

class metadata():
    def __init__(self, name, v_id, url, location):
        self.name = name
        self.id=v_id
        self.url=url
        self.location=location
        #TODO: add thumbnail and other info
#end class

def download_video(video):
    def test_hook(d):
        if d['status'] == 'finished':
            print("Done downloading. Starting conversion")
    # end test_hook

    options = {
	#'verbose': True,
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'opus',
        }],
        'progress_hooks': [test_hook],
		'outtmpl': os.path.join(os.getcwd(),'recordings','%(id)s.%(ext)s')
    }

    print("Downloading video {0}".format(video))
    downloader = YoutubeDL(options)
    # Get all of the info
    info_dict = downloader.extract_info(video, download=False)
    video_url = info_dict.get("url", None)
    video_id = info_dict.get("id", None)
    video_title = info_dict.get('title', None)
    # Download the video
    downloader.download([video])
    
    # by now, there should be a 'video_id.opus' file, transcode to ogg
    assert(video_id+".opus" in os.listdir('recordings'))
    print("Transcoding {0}.opus to {0}.ogg".format(video_id))
    
    file_noext = os.path.join(os.getcwd(),'recordings',video_id)
    os.system("""avconv -i {0}.opus -c:a libopus {0}.ogg -y""".format(file_noext))
    
    retVal=metadata(video_title, video_id, video_url, file_noext+".ogg")
    os.remove(file_noext+".opus")
    
    print("""Video with ID {} is done. Pass to transcriber""".format(video_id))
    return retVal
# end download_videos

if __name__ == "__main__":
    download_video(sys.argv[1:][0])
