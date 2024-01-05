/* Navbar Switch */
let nav_1 = document.querySelector("#nav-1");
let nav_2 = document.querySelector("#nav-2");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav_1.classList.add("hidden");
    nav_2.classList.remove("hidden");
  } else {
    nav_1.classList.remove("hidden");
    nav_2.classList.add("hidden");
  }
});

/* Sidebar Open & Close */
let openbtn = document.querySelectorAll(".openbtn");
let closebtn = document.querySelector("#closebtn");
let sidebar = document.querySelector("#sidebar");

closebtn.addEventListener("click", toggleSidebar);

function toggleSidebar() {
  sidebar.classList.toggle("hidden");
}
openbtn.forEach((btn) => {
  btn.addEventListener("click", toggleSidebar);
});

/* Hero Section Slideshow */
document.addEventListener("DOMContentLoaded", function () {
  const interval = 2500;

  const textElements = document.querySelectorAll(".slideshow-text");

  let currentIndex = 0;

  function showNextText() {
    // Hide the current text
    textElements[currentIndex].style.display = "none";

    // Increment the index or reset to 0 if at the end
    currentIndex = (currentIndex + 1) % textElements.length;

    // Show the next text
    textElements[currentIndex].style.display = "block";
  }

  // Show the first text initially
  textElements[currentIndex].style.display = "block";

  // Set the interval to change the text
  setInterval(showNextText, interval);
});

// View Count Convert to Integer
let view_count_span = document.querySelectorAll(".view_count");
view_count_span.forEach((view_count) => {
  view_count.textContent = parseInt(view_count.textContent);
});

// Audio Downlaod AJAX
function sendPostRequest(dynamicPart, event) {
  event.preventDefault();

  let confirmation = confirm("Do you want to download the file?");
  document.getElementById("loader_div").classList.remove("hidden");
  loader_gif = document.getElementById("loader_gif");
  downloading = document.getElementById("downloading");
  download_link = document.getElementById("download_link");
  download_form = document.getElementById("form_download");

  if (confirmation) {
    let dynamicUrl = "/audio_download/" + dynamicPart;
    fetch(dynamicUrl, {
      method: "POST",
    })
      .then((response) => response.text()) // Assuming the response is plain text
      .then((data) => {
        // Update the HTML with the data received from the server
        loader_gif.classList.add("hidden");
        downloading.classList.add("hidden");
        download_form.classList.remove("hidden");
        download_link.href = "/" + data + ".mp3";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
