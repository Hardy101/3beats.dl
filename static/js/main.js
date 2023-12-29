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

/* Music Play, Pause and Progress */
let musicList = document.querySelectorAll(".music");
let progressBar = document.querySelectorAll(".progress-bar");
let play_audio = document.getElementById("play_audio");
let pause_audio = document.getElementById("pause_audio");

function playAudio(audio, el, pause_el) {
  el.classList.add("hidden");
  pause_el.classList.remove("hidden");
//  audio.play();
}

function pauseAudio(audio, el, play_el) {
  el.classList.add("hidden");
  play_el.classList.remove("hidden");
//  audio.pause();
}

musicList.forEach((music) => {
  music.addEventListener("timeupdate", function () {
    // Calculate the progress percentage
    let progress = (music.currentTime / music.duration) * 100;
    // Update the width of the progress bar
    progressBar.forEach((bar) => {
      bar.style.width = progress + "%";
    });
  });
});

/* Slideshow */
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
let view_count_span = document.querySelectorAll('.view_count')
view_count_span.forEach((view_count)=>{
    view_count.textContent = parseInt(view_count.textContent)
})

   function sendPostRequest(dynamicPart, event) {
        event.preventDefault();
        // Create a new FormData object
        let formData = new FormData();

        let confirmation = confirm('Do you want to download the file?')

        if (confirmation){
        // Construct the dynamic URL
        let dynamicUrl = '/video/' + dynamicPart;
        console.log(dynamicUrl)

        // Use the Fetch API to send a POST request
        fetch(dynamicUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Handle the response as needed
            console.log(response);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
        }
    }