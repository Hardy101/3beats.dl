from moviepy.editor import *


def convert_video_to_audio(file_dir, file_ext, output_file_name):
    video = VideoFileClip(file_dir+file_ext)
    video.audio.write_audiofile(f"static/downloads/video/{output_file_name}.{file_ext}")
    return f'//static/downloads/audio/{output_file_name}'


# print(convert_video_to_audio('static/downloads/video/Unstoppable', 'mp4', 'unstoppable'))
# video = VideoFileClip('static/downloads/video/Chandelier(OfficialVideo).mp4')
