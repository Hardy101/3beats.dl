from flask import Flask, render_template, jsonify, request
from scrapetube import get_search
from pytube import YouTube
import os.path
from moviepy.editor import *
from functions import convert_video_to_audio

app = Flask(__name__)


@app.route('/audio-downloader/<video_id>', methods=['GET', 'POST'])
def audio_downloader(video_id):
    download_link = 'None'
    youtube_url = "https://www.youtube.com/watch?v=" + video_id
    yt = YouTube(youtube_url)

    if request.method == 'POST':
        try:
            stream = yt.streams.filter(file_extension='mp4', progressive=True).first()
            download_path = os.path.join('static', 'downloads', 'video')
            stream.download(output_path=download_path)
            convert_video_to_audio(f'static/downloads/video/{yt.title}.mp4', 'mp4',
                                   f'{yt.title}', 'audio')
            print(f'/{download_path}/{yt.title}.mp3')
            return jsonify({'download_path': f'/static/downloads/audio/{yt.title}.mp3'})

        except Exception as e:
            return jsonify({'download_path': str(e)})
    return render_template('audio-downloader.html', video_info=yt, download_link=download_link)


@app.route('/video-to-mp3', methods=['GET', 'POST'])
def convert_video():
    if request.method == 'POST':
        try:
            video_to_convert = request.files['video_to_convert']
            ext = request.form['ext']
            video_to_convert.save(os.path.join(f'static/uploads/', video_to_convert.filename))
            output_file_path = convert_video_to_audio(f'static/uploads/{video_to_convert.filename}',
                                                      f'{ext}', f'{video_to_convert.filename}',
                                                      'vid_convert')
            return jsonify({'file_path': f'{output_file_path}'})
        except Exception as e:
            return jsonify({'file_path': str(e)})
    return render_template('video-to-mp3-converter.html')


@app.route('/delete_files', methods=['GET', 'POST'])
def delete_files():
    path = './static/downloads/video'
    try:
        for file in path:
            os.remove(file)
        return 'successful'
    except Exception as e:
        return f'{e}'


# Route to return Video path to download 
@app.route('/download', methods=['GET', 'POST'])
def download():
    if request.method == 'POST':
        try:
            resolution = request.form['resolution']
            youtube_url = request.form['youtube_url']
            yt = YouTube(youtube_url)
            yt.title = yt.title.replace(' ', '')
            video_stream = yt.streams.filter(res=resolution, file_extension='mp4', progressive=True).first()
            download_path = os.path.join('static', 'downloads', 'video')
            video_stream.download(download_path)
            return jsonify({'download_path': f"/{download_path}/{yt.title}.mp4"})
        except Exception as e:
            return jsonify({'error': str(e)})


@app.route('/error/<error_msg>')
def error(error_msg):
    return render_template('error.html', error=error_msg)


@app.route('/fetch_data', methods=['GET', 'POST'])
def fetch_data():
    music_query = 'fish'
    data = get_search(music_query, limit=10)
    data_list = list(data)
    return jsonify(data_list)


@app.route('/', methods=['GET', 'POST'])
def index():
    data = []
    if request.method == 'POST':
        try:
            music_query = request.form['search_music'].lower()
            data = list(get_search(music_query, limit=9))
            return render_template('index.html', data=data, music_query=music_query)
        except Exception as e:
            return render_template('index.html', error_msg=e)
    return render_template('index.html', data=data)


@app.route('/yt-video-downloader/<video_id>', methods=['GET', 'POST'])
def video_downloader(video_id):
    youtube_url = "https://www.youtube.com/watch?v=" + video_id
    try:
        yt = YouTube(youtube_url)
        video_streams = yt.streams.filter(file_extension='mp4', progressive=False).all()
        resolutions = sorted(set(stream.resolution for stream in video_streams if stream.resolution is not None))
        return render_template('video-download.html', video_data=yt, resolutions=resolutions, youtube_url=youtube_url)
    except Exception as e:
        return render_template('error.html', error_msg=f'{e}')


if __name__ == "__main__":
    app.run(debug=True)
