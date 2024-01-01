from flask import Flask, render_template, url_for, jsonify, request, redirect
from scrapetube import get_search
from pytube import YouTube
from functions import delete_file_after_delay

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    data = []
    audio_list = []
    if request.method == 'POST':
        music_query = request.form['search_music']
        data = list(get_search(music_query, limit=9))
    return render_template('index.html', data=data)


@app.route('/fetch_data', methods=['GET', 'POST'])
def fetch_data():
    music_query = 'fish'
    data = get_search(music_query, limit=10)
    data_list = list(data)
    return jsonify(data_list)


@app.route('/video/<video_id>', methods=['GET', 'POST'])
def video(video_id):
    audio_list = []
    download_link = 'None'
    youtube_url = "https://www.youtube.com/watch?v=" + video_id
    yt = YouTube(youtube_url)

    if request.method == 'POST':
        # Get the audio stream
        video = yt.streams.filter(only_audio=True, progressive=False, type="audio", file_extension='mp3') #.first()
        stream = yt.streams.get_by_itag(250)
        destination = 'static/'
        stream.download(output_path=destination, filename=f"{yt.title.replace(' ', '')}.mp3")
        download_link = destination+yt.title.replace(' ', '')

        # Call the function
        # delete_file_after_delay(download_link, 10)
        return redirect(url_for('static', filename=f"{yt.title.replace(' ', '')}.mp3"))
    return render_template('video.html', video_info=yt, download_link=download_link)


@app.route('/yt-video-downloader/<video_id>', methods=['GET', 'POST'])
def video_downloader(video_id):
    youtube_url = "https://www.youtube.com/watch?v=" + video_id
    try:
        yt = YouTube(youtube_url)
        video_streams = yt.streams.filter(file_extension='mp4', progressive=False).all()
        resolutions = sorted(set(stream.resolution for stream in video_streams if stream.resolution is not None))
        return render_template('video-download.html', video_data=yt, resolutions=resolutions, youtube_url=youtube_url)
    except Exception as e:
        return render_template('video-download.html', error=str(e))


@app.route('/download', methods=['GET', 'POST'])
def download():
    youtube_url = request.form['youtube_url']
    resolution = request.form['resolution']

    yt = YouTube(youtube_url)
    video_stream = yt.streams.filter(res=resolution, file_extension='mp4', progressive=False).first()
    audio_stream = yt.streams.filter(file_extension='mp3', progressive=False).first()
    video_stream.download('./downloads')
    audio_stream.download('./downloads')
    return render_template('video-download.html', video_data=yt, link=f'./downloads/{yt.title}.mp4')


if __name__ == "__main__":
    app.run(debug=True)
