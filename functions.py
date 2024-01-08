from moviepy.editor import *


def convert_video_to_audio(file_name, file_ext, output_file_name):
    video = VideoFileClip(f"{file_name}")
    audio_output = video.audio.write_audiofile(f"./static/downloads/audio/{output_file_name}.mp3")
    return f'.//static/downloads/audio/{output_file_name}'
