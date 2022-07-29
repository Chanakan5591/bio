let now_playing = document.querySelector(".now-playing");
let playpause_btn = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
const main = document.querySelector('main')
const container = document.querySelector('.container')

// Specify globally used values
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');


function loadTrack() {
	// Clear the previous seek timer
	clearInterval(updateTimer);
	resetValues();

	// Load a new track
	curr_track.src = "./music/notion.webm";
	curr_track.loop = true;
	curr_track.load();

	// Set an interval of 1000 milliseconds
	// for updating the seek slider
	updateTimer = setInterval(seekUpdate, 1000);

	// Move to the next track if the current finishes playing
	// using the 'ended' event

}
// Function to reset all values to their default
function resetValues() {
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
}


function playpauseTrack() {
	// Switch between playing and pausing
	// depending on the current state
	if (!isPlaying) playTrack();
	else pauseTrack();
}

function playTrack() {
	// Play the loaded track
	curr_track.play();
	isPlaying = true;

	// Replace icon with the pause icon
	playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
	// Pause the loaded track
	curr_track.pause();
	isPlaying = false;

	// Replace icon with the play icon
	playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function seekTo() {
	// Calculate the seek position by the
	// percentage of the seek slider
	// and get the relative duration to the track
	seekto = curr_track.duration * (seek_slider.value / 100);

	// Set the current track position to the calculated seek position
	curr_track.currentTime = seekto;
	seekUpdate();
}

function setVolume() {
	// Set the volume according to the
	// percentage of the volume slider set
	curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
	let seekPosition = 0;

	// Check if the current track duration is a legible number
	if (!isNaN(curr_track.duration)) {
		seekPosition = curr_track.currentTime * (100 / curr_track.duration);
		seek_slider.value = seekPosition;

		// Calculate the time left and the total duration
		let currentMinutes = Math.floor(curr_track.currentTime / 60);
		let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
		let durationMinutes = Math.floor(curr_track.duration / 60);
		let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

		// Add a zero to the single digit time values
		if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
		if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
		if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
		if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

		// Display the updated duration
		curr_time.textContent = currentMinutes + ":" + currentSeconds;
		total_duration.textContent = durationMinutes + ":" + durationSeconds;
	}
}

loadTrack();

window.addEventListener('DOMContentLoaded', () => {
	main.style.opacity = 1
	main.style.filter = 'none'
	container.style.backdropFilter = 'blur(10px) !important'
})
