
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("playPauseButton");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const loopButton = document.getElementById("loopButton");

function setProgressBarStyle(value) {
    progressBar.style.setProperty("--progress", `${value}%`);
}
function setVolumeBarStyle(value) {
    volumeBar.style.setProperty("--progress", `${value * 100}%`);
}


playPauseButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<span class="material-symbols-outlined" id="pauseButton">pause</span>';
    } else {
        audio.pause();
        playPauseButton.innerHTML = '<span class="material-symbols-outlined" id="playButton">play_arrow</span>';
    }
});

audio.addEventListener("timeupdate", function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = duration ? (currentTime / duration) * 100 : 0;
    document.getElementById("currentTime").textContent = formatTime(currentTime);
    document.getElementById("duration").textContent = formatTime(duration);
    progressBar.value = progress;
    setProgressBarStyle(progress);
});

audio.addEventListener("loadedmetadata", function () {
    document.getElementById("duration").textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", function () {    
    const progress = progressBar.value;
    const duration = audio.duration;
    audio.currentTime = (progress / 100) * duration;
    setProgressBarStyle(progress);
});

volumeBar.addEventListener("input", function () {
    const volume = Number(volumeBar.value);
    audio.volume = volume;
    setVolumeBarStyle(volume);
});

loopButton.addEventListener("click", function () {
    audio.loop = !audio.loop;
    loopButton.innerHTML = audio.loop ? '<span class="material-symbols-outlined">repeat_on</span>' : '<span class="material-symbols-outlined">repeat</span>';
});

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }
    const minutes =Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

setProgressBarStyle(progressBar.value);
setVolumeBarStyle(Number(volumeBar.value));