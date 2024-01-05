const res_btn = document.querySelectorAll(".res_btn");
const form_download = document.getElementById("form_download");
const loader_gif = document.getElementById("loader_gif");
const downloading = document.getElementById("downloading");
const download_link = document.getElementById("download_link");
const download_form = document.getElementById("form_download");

function downloadFile(button) {
  let resolution = button.value;
  let youtubeUrl = document.getElementById("youtube_url").value;

  let formData = new FormData();
  formData.append("resolution", resolution);
  formData.append("youtube_url", youtubeUrl);

  document.getElementById("loader_div").classList.remove("hidden");

  fetch("/download", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Server response:", data.download_path);
      loader_gif.classList.add("hidden");
      downloading.classList.add("hidden");
      download_link.classList.remove("hidden");
      download_link.href = data.download_path;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
