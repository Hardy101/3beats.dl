const video_upload_body = document.getElementById("video-upload-body");
const upload_label = document.getElementById("upload_label");
const video_to_convert = document.getElementById("video_to_convert");
const video_uploaded = document.getElementById("video_uploaded");
const filename = document.getElementById("filename");
const filesize = document.getElementById("filesize");
const cancel_video = document.getElementById("cancel_video");
const ext = document.getElementById("ext");
const convert_button = document.getElementById("convert_button");
const download_button = document.getElementById("download_button");
const loader = document.getElementById("loader");

window.onload = function () {
  video_to_convert.addEventListener("change", handleFileChange);
};

// Functions
const handleFileChange = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file_type = files[0].type;
    const fileName = files[0].name;
    const fileSize = files[0].size;
    if (file_type == "video/mp4") {
      filename.textContent = fileName;
      filesize.textContent = (fileSize / 1000000).toFixed(2);
      ext.value = file_type.split("/")[1];
      reset_divs();
    } else {
      alert("Please upload a valid video file");
    }
  } else {
    filename.textContent = "";
    filesize.textContent = "";
  }
};

const clear_video_info = () => {
  handleFileChange({ target: { files: [] } });
  reset_divs();
  convert_button.classList.remove("hidden");
  download_button.href = "";
  download_button.classList.add("hidden");
};

const reset_divs = () => {
  video_upload_body.classList.toggle("hidden");
  video_uploaded.classList.toggle("hidden");
};

convert_button.addEventListener("click", () => {
  loader.classList.remove("hidden");
  convert_button.classList.add("hidden");
  let videoFile = video_to_convert.files[0];

  let formData = new FormData();
  formData.append("video_to_convert", videoFile);
  formData.append("ext", ext.value);

  fetch("/video-to-mp3", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      convert_button.classList.add("hidden");
      download_button.href = data.file_path;
      download_button.classList.remove("hidden");
      loader.classList.add("hidden");
      console.log(data.file_path);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
