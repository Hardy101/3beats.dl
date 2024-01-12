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
    textElements[currentIndex].style.display = "none";
    currentIndex = (currentIndex + 1) % textElements.length;
    textElements[currentIndex].style.display = "block";
  }
  textElements[currentIndex].style.display = "block";
  setInterval(showNextText, interval);
});

// View Count Convert to Integer
let view_count_span = document.querySelectorAll(".view_count");
view_count_span.forEach((view_count) => {
  view_count.textContent = parseInt(view_count.textContent);
});

// Audio Download AJAX
const loader_gif = document.getElementById("loader_gif");
const downloading = document.getElementById("downloading");
const download_link = document.getElementById("download_link");

function sendPostRequest(event) {
  document.getElementById("loader_div").classList.remove("hidden");
  let videoId = event.currentTarget.getAttribute("data-video-id");
  let endpoint = "http://127.0.0.1:5000/audio-downloader/" + videoId;
  fetch(endpoint, { method: "POST" })
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
      console.error("Request failed:", error);
    });
}
