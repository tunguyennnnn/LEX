import os
import sys
from youtube_dl import YoutubeDL

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
    downloader.download([video])
# end download_videos

if __name__ == "__main__":
    download_video(sys.argv[1:][0])
