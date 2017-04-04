import os
import sys
from youtube_dl import YoutubeDL

class metadata():
    def __init__(self, name, id, url, location):
        self.name = name
        self.id=id
        self.url=url
        self.location=location
#end class

def download_video(video):
    def test_hook(d):
        if d['status'] == 'finished':
            print("Done downloading. Starting conversion")
    # end test_hook

    options = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'opus',
        }],
        'progress_hooks': [test_hook],
        'outtmpl': os.path.join('recordings','%(id)s.%(ext)s')
    }

    downloader = YoutubeDL(options)
    info_dict = downloader.extract_info(video, download=False)
    video_url = info_dict.get("url", None)
    video_id = info_dict.get("id", None)
    video_title = info_dict.get('title', None)
    
    downloader.download([video])
    
    # return the metadata on this video
    retVal=metadata(video_title, video_id, video_url, os.path.join(os.getcwd(),'recordings','{}.opus'.format(video_id)))
    return retVal
# end download_videos

if __name__ == "__main__":
    download_video(sys.argv[1:][0])
