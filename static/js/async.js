document.addEventListener("DOMContentLoaded", function () {
    // Fetch data when the page is loaded
    fetchData();

    function fetchData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/fetch_data", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parse JSON response
                let data = JSON.parse(xhr.responseText);

                // Add fetched data to the list
                updateVideoList(data);
            } else {
                console.error("Error fetching data:", xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error("Network error while fetching data.");
        };

        xhr.send();
    }

    function updateVideoList(data) {
        let videoList = document.getElementById("video-list");

        // Check if the 'video-list' element exists
        if (!videoList) {
            console.error("Element with ID 'video-list' not found.");
            return;
        }

        // Clear existing content
        videoList.innerHTML = '';

        // Add new video items based on fetched data
        data.forEach(function (item, index) {
            // Index Capture
            let Index = index+1
            let Id = item['videoId']
            youtube_url = "https://www.youtube.com/watch?v=" + Id
            // Create a div for each video
            let videoDiv = document.createElement("div");
            videoDiv.className = "result flex gap-4 result shadow-1 p-2 rounded-md my-auto";

            // Create an img element for the thumbnail
            let thumbnailImg = document.createElement("img");
            thumbnailImg.src = item.thumbnail.thumbnails[0].url;
            thumbnailImg.className = "w-2/5";
            thumbnailImg.alt = "Thumbnail";

            // Create a div for the video details
            let detailsDiv = document.createElement("div");
            detailsDiv.className = "w-3/5";

            // Add video title
            let titleSpan = document.createElement("span");
            titleSpan.className = "block text-xl font-bold my-2";
            titleSpan.textContent = item.title.runs[0].text;

            // Add buttons and other details
           // Assuming 'item.videoId' is a unique identifier for each video
            let actionDiv = document.createElement("div");
            actionDiv.className = "action action-buttons flex justify-between gap-3";

            // Download Button
            let downloadButton = document.createElement("button");
            downloadButton.className = "text-white bg-color3 w-1/2 py-1 rounded-sm shadow-md";
            downloadButton.id = Id; // Set your desired unique ID here
            downloadButton.innerHTML = '<i class="uil uil-import"></i> Download';

            // Play Button
            let playButton = document.createElement("a");
            playButton.className = "play_audio flex justify-center text-white bg-color3 w-1/2 py-1 rounded-sm shadow-md";
            playButton.href = youtube_url;
            playButton.id = 'play_audio'+Id;
            playButton.innerHTML = '<i class="uil uil-play"></i> Play';
            playButton.onclick = function () {
                playAudio(document.getElementById('music'+Id), this, document.getElementById('pause_audio'+Id));
            };

            // Pause Button
            let pauseButton = document.createElement("button");
            pauseButton.className = "hidden text-white bg-color3 w-1/2 py-1 rounded-sm shadow-md";
            pauseButton.id = 'pause_audio'+Id;
            pauseButton.innerHTML = '<i class="uil uil-pause"></i> Pause';
            pauseButton.onclick = function () {
                pauseAudio(document.getElementById('music'+Id), this, document.getElementById('play_audio'+Id));
            };

            // ... (add other details and buttons as needed)
            // Append buttons to action Div
            actionDiv.appendChild(downloadButton);
            actionDiv.appendChild(playButton);
            actionDiv.appendChild(pauseButton);

            // Video Info
            let videoInfo = document.createElement("div");
            videoInfo.className = "videoInfo flex gap-5 mt-2";
            //... Music Progress Action
            // Music Progress Parent Div
            let progress_parent_div = document.createElement("div");
            progress_parent_div.className = "action-music flex gap-2 mt-2";

            // Pause Icon
            let pause_icon = document.createElement("i");
            pause_icon.className = "uil uil-music";

            // Music Length Div
            let music_length = document.createElement("div");
            music_length.className = "relative rounded-full h-0.5 w-full bg-gray-200 my-auto";

            // Music Progress Div
            let progress_bar_div = document.createElement("div");
            progress_bar_div.className = "progress-bar bg-color3 h-full";

            // Append Elements to Music Progress Parent Div
            progress_parent_div.appendChild(pause_icon)
            progress_parent_div.appendChild(music_length)

            music_length.appendChild(progress_bar_div)

//             <div class="action-music flex gap-2 mt-2">
//                  <i class="uil uil-pause"></i>
//                  <div class="relative rounded-full h-0.5 w-full bg-gray-200 my-auto"></div>
//                </div>
            // Views
//            let viewsSpan = document.createElement('span')
//            viewsSpan.className = 'font-bold'
//            viewCount = parseInt(item.viewCountText.simpleText)
//            viewsSpan.innerHTML = "<i class='uil uil-eye'></i> " + viewCount + "M";
//
//
//            // Duration
//            let durationSpan = document.createElement('span')
//            durationSpan.className = 'font-bold'
//            duration = item.lengthText.simpleText
//            durationSpan.innerHTML = "<i class='uil uil-clock'></i> " + duration;
//
//            // Append Likes and Views to Video Info Div
//            videoInfo.appendChild(viewsSpan)
//            videoInfo.appendChild(durationSpan)

            // Append elements to their respective parents
            actionDiv.appendChild(downloadButton)

            detailsDiv.appendChild(titleSpan);
            detailsDiv.appendChild(actionDiv); // Add the actionDiv for buttons
            detailsDiv.appendChild(videoInfo);
            detailsDiv.appendChild(progress_parent_div)

            videoDiv.appendChild(thumbnailImg);
            videoDiv.appendChild(detailsDiv);
            videoList.appendChild(videoDiv);
        });
    }
});
// Send Links to Server
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('play_audio')) {
            event.preventDefault();
            let href = event.target.getAttribute('href');

           fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'href': href }),
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
    });
});


