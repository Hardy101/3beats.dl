from flask import Flask, render_template, url_for, jsonify, request
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
        data = list(get_search(music_query, limit=10))
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
        video = yt.streams.filter(only_audio=True, progressive=True, file_extension='mp3') #.first()
        stream = yt.streams.get_by_itag(22)
        destination = 'static/'
        stream.download(output_path=destination, filename=f"{yt.title.replace(' ', '')}.mp3")
        download_link = destination+yt.title.replace(' ', '')

        # Call the function
        delete_file_after_delay(download_link, 2)
        return download_link
    return render_template('video.html', video_info=yt, download_link=download_link)


if __name__ == "__main__":
    app.run(debug=True)
