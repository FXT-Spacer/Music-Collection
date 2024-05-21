const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Hay là chúng ta cứ như vậy một vạn năm - Hoàng Tiêu Vân (Trường Nguyệt Tẫn Minh OST).mp3',
        displayName: 'Trường Nguyệt Tẫn Minh OST',
        cover: 'https://i.ytimg.com/vi/6sJeakNmoWw/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhYIGUoZTAP&rs=AOn4CLCkZmTk3DHyurzyR_8WFDLJukm81Q',
        artist: 'Hoàng Tiêu Vân',
    },
    {
        path: 'assets/Tìm thấy nhau - SIVAN.mp3',
        displayName: 'Tìm thấy nhau',
        cover: 'https://i.ytimg.com/vi/QTULiXpMgLk/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IC4oOTAP&rs=AOn4CLA1QE4WYNTcU_knHQ4Y_S4SJtnt-g',
        artist: 'SIVAN',
    },
    {
        path: 'assets/Tháng năm - Soobin Hoàng Sơn.mp3',
        displayName: 'Tháng năm',
        cover: 'https://i.ytimg.com/vi/UyXngX4kTfE/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIEUoQjAP&rs=AOn4CLAHw2Jrw2kEawP8RMZ-NWZWimJpXQ',
        artist: 'Soobin Hoàng Sơn',
    },
    {
        path: 'assets/Giá như - Soobin Hoàng Sơn.mp3',
        displayName: 'Giá như',
        cover: 'https://i.ytimg.com/vi/SeWt7IpZ0CA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBeixW-45OM-XaGpg51afCRy7GUZghttps://i.ytimg.com/vi/UyXngX4kTfE/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIEUoQjAP&rs=AOn4CLAHw2Jrw2kEawP8RMZ-NWZWimJpXQ',
        artist: 'Soobin Hoàng Sơn',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);