from moviepy.editor import *


def convert_video_to_audio(file_dir, file_ext, output_file_name, convert_type):
    if '.mp4' in output_file_name:
        output_file_name = output_file_name.replace('.mp4', '')
    elif '.mkv' in output_file_name:
        output_file_name = output_file_name.replace('.mkv', '')
    elif '.avi' in output_file_name:
        output_file_name = output_file_name.replace('.avi', '')
    video = VideoFileClip(file_dir)
    video.audio.write_audiofile(f"static/downloads/audio/{output_file_name}.mp3")
    return f'./static/downloads/audio/{output_file_name}.mp3'


