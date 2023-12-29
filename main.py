import os.path
from pathlib import Path
import io
from flask import Flask, render_template, url_for, jsonify, request, send_file
from scrapetube import get_search
from pytube import YouTube
from plyer import notification

app = Flask(__name__)


# query = 'Bloody Mary'
# data = get_search(query, limit=10)
# data_list = list(data)


@app.route('/', methods=['GET', 'POST'])
def index():
    data = []
    audio_list = []
    if request.method == 'POST':
        music_query = request.form['search_music']
        data = list(get_search(music_query, limit=10))
        # data_response = request.get_json(force=True)
        # link = data_response.get('href')
        # yt = YouTube(link)
        #
        # # Get the audio stream
        # audio_stream = yt.streams.filter(only_audio=True).first()
        #
        # # Stream the audio content
        # audio_data = io.BytesIO()
        # audio_stream.stream_to_buffer(audio_data)
        # audio_data.seek(0)
        #
        # # Append audio metadata to the list
        # audio_list.append({
        #     'title': yt.title,
        #     'author': yt.author,
        #     'link': link,
        # })
        #
        # # Set the proper Content-Type header
        # headers = {
        #     'Content-Type': 'audio/mpeg',
        #     'Content-Disposition': 'inline; filename=music.mp3',
        # }
        #
        # return send_file(audio_data, mimetype='audio/mpeg', as_attachment=False, download_name='music.mp3',
        #                  headers=headers)

    # Download
    # destination = '.'
    # out_file = video.download(output_path=destination)
    # base, ext = os.path.splitext(out_file)
    # new_file = base + '.mp3'
    # os.rename(out_file, new_file)
    # return render_template('index.html', audio_list=audio_list)
    return render_template('index.html', data=data)


@app.route('/fetch_data', methods=['GET', 'POST'])
def fetch_data():
    # data_list = None
    # music_query = request.form['search_music']
    music_query = 'fish'
    data = get_search(music_query, limit=10)
    data_list = list(data)
    return jsonify(data_list)


@app.route('/video/<video_id>', methods=['GET', 'POST'])
def video(video_id):
    audio_list = []
    youtube_url = "https://www.youtube.com/watch?v=" + video_id
    yt = YouTube(youtube_url)

    if request.method == 'POST':
        # Get the audio stream
        video = yt.streams.filter(only_audio=True, progressive=True, file_extension='mp3') #.first()
        stream = yt.streams.get_by_itag(22)
        destination = str(Path.home() / "Downloads")
        stream.download(output_path=destination, filename=f"{yt.title}.mp3")
        notification.notify(
            title="Download Complete",
            message=f"{yt.title} has been downloaded to {destination}",
        )


    # out_file = video.download(output_path=destination)
    # base, ext = os.path.splitext(out_file)
    # new_file = base + '.mp3'
    # os.rename(out_file, new_file)
    return render_template('video.html', video_info=yt)


if __name__ == "__main__":
    app.run(debug=True)
