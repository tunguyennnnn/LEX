import os
import sys
from youtube_dl import YoutubeDL

def download_video(video_id):
    def test_hook(d):
        if d['status'] == 'finished':
            print("Done downloading. Starting conversion")
    # end test_hook

    options = {
		'verbose': True,
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'opus',
        }],
        'progress_hooks': [test_hook],
		'outtmpl': os.path.join(os.getcwd(),'recordings','%(id)s.%(ext)s')
    }

    print("Downloading video with ID {0} from youtube".format(video_id))
    downloader = YoutubeDL(options)
    downloader.download(["""https://www.youtube.com/watch?v={}""".format(video_id)])
    
    # by now, there should be a 'video_id.opus' file, transcode to ogg
    assert(video_id+".opus" in os.listdir('recordings'))
    print("Transcoding {0}.opus to {0}.ogg".format(video_id))
    os.system("""avconv -i {0}.opus -c:a libopus {0}.ogg""".format(os.path.join(os.getcwd(),'recordings',video_id)))
    print("""Video with ID {} is done. Pass to transcriber""".format(video_id))
# end download_videos

if __name__ == "__main__":
    download_video(sys.argv[1:][0])
