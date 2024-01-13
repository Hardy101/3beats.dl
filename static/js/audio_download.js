function submitForm() {
  var form = document.getElementById("form_download");
  var url = form.getAttribute("action");
  var formData = new FormData(form);
  fetch(url, {
    method: "POST",
    body: formData,
  })
  .then(response => {
    return response.json();
  })
  .then((data) => {
      console.log("Server response:", data.download_path);
      loader_gif.classList.add("hidden");
      downloading.classList.add("hidden");
      download_link.classList.remove("hidden");
      download_link.href = data.download_path;
    })
  .catch(error => {
    console.error('Error:', error);
  });
}