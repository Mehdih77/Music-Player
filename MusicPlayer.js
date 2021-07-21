const track = document.getElementById('track')
const thumbnail = document.getElementById('thumbnail')
const trackArtist = document.getElementById('track-artist')
const trackTitle = document.getElementById('track-title')
const progressBar = document.getElementById('progressBar')
const currentTime = document.getElementById('currentTime')
const durationTime = document.getElementById('durationTime')

let play = document.getElementById('play')
let pause = document.getElementById('pause')
let next = document.getElementById('next-track')
let prev = document.getElementById('prev-track')

trackIndex = 0;

tracks = [
    './src/audio/Shadmehr Aghili - Rabeteh.mp3',
    './src/audio/All I Want.mp3',
    './src/audio/Masih & Arash AP - Goli (320).mp3',
    './src/audio/Slow Down - Imany.mp3'
];
thumbnails = [
    './src/img/Shadmehr-Aghili-Rabeteh img.jpg',
    './src/img/all i want.jpg',
    './src/img/Masih-Arash-Ap-Goli img.jpg',
    './src/img/slow down.jpg'
];
trackArtists = ["Shadmehr Aghili", "Sarah Blasko", "Masih & Arash AP","Imany"];
trackTitles =  ["Rabeteh", "All I Want", "Goli", "Slow Down"];

let playing = true;

function pausePlay() {
    if (playing) {
        play.style.display = 'none';
        pause.style.display = 'block';
        thumbnail.style.transform = "scale(1.07)";
        track.play();
        playing = false;
    } else {
        play.style.display = 'block';
        pause.style.display = 'none';
        thumbnail.style.transform = "scale(1)";
        track.pause();
        playing = true;
    }
}

play.addEventListener("click", pausePlay)
pause.addEventListener("click", pausePlay)


// NEXT & PREV track
function nextTrack() {
    trackIndex++;
    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }
    track.src = tracks[trackIndex];
    thumbnail.src = thumbnails[trackIndex];
    trackArtist.textContent = trackArtists[trackIndex];
    trackTitle.textContent = trackTitles[trackIndex];
    playing = true;
    pausePlay();
}
next.addEventListener("click", nextTrack);
track.addEventListener("ended", nextTrack)

function prevTrack() {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }
    track.src = tracks[trackIndex];
    thumbnail.src = thumbnails[trackIndex];
    trackArtist.textContent = trackArtists[trackIndex];
    trackTitle.textContent = trackTitles[trackIndex];
    playing = true;
    pausePlay();
}
prev.addEventListener("click", prevTrack)


// calculate Duration Time
function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec - minutes * 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

function progressValue() {
    progressBar.max = track.duration;
    progressBar.value = track.currentTime;
    currentTime.textContent = formatTime(track.currentTime);
    durationTime.textContent = formatTime(track.duration);
}
setInterval(progressValue, 500);

// ProgressBar
function changeProgressBar() {
    track.currentTime = progressBar.value;
}
progressBar.addEventListener("click", changeProgressBar)