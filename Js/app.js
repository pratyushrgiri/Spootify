const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("playPauseButton");
const progressBar = document.getElementById("progressBar");


playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

audio.addEventListener("timeupdate", function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    document.getElementById("currentTime").textContent = formatTime(currentTime);
    document.getElementById("duration").textContent = formatTime(duration);
    document.getElementById("progressBar").value = progress;
});

progressBar.addEventListener("input", function () {    
    const progress = progressBar.value;
    const duration = audio.duration;
    audio.currentTime = (progress / 100) * duration;
});

function formatTime(seconds) {
    const minutes =Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}