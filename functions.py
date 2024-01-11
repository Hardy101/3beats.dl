from moviepy.editor import *


def convert_video_to_audio(file_dir, file_ext, output_file_name, convert_type):
    file_name = file_dir.split('.')[0]
    print(file_name)
    print(output_file_name)
    video = VideoFileClip(file_name+'.'+file_ext)
    video.audio.write_audiofile(f"static/downloads/audio/{output_file_name}.mp3")
    return f'.//static/downloads/audio/{output_file_name}.mp3'


# print(convert_video_to_audio('static/downloads/video/Chandelier(OfficialVideo)', 'mp4', 'unstoppable'))
# The error is in the file name
# Video convert function sends in the file name alongside the extension,
# so either find a way to remove the file extension in the function or send just the file name and get rid of the conditional statements
