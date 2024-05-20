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
        path: 'assets/Ai Đâu Hay - Seanpoet.mp3',
        displayName: 'Ai Đâu Hay',
        cover: 'https://i.ytimg.com/vi/RLYtfjnPOfQ/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIEQoTzAP&rs=AOn4CLBqRo4pxjNILrDTKsCxjE2H5Ia50w',
        artist: 'Seanpoet',
    },
    {
        path: 'assets/Cả Một Đời Để Quên - Đặng Tuấn Vũ.mp3',
        displayName: 'Cả Một Đời Để Quên',
        cover: 'https://i.ytimg.com/vi/Mo74KkfQH8o/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAFcKW6-d-6Bo8gturHg7Tjk8I1Hw',
        artist: 'Đặng Tuấn Vũ',
    },
    {
        path: 'assets/Em Của Quá Khứ - Huy Nam.mp3',
        displayName: 'Em Của Quá Khứ',
        cover: 'https://i.ytimg.com/vi/itH7J_cnjQU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAbtMlCctQVCQOA5t9CQfEf1yxVAA',
        artist: 'Huy Nam',
    },
    {
        path: 'assets/Thuyền Không Bến Đợi - Trungg I.U ft. Czee.mp3',
        displayName: 'Thuyền Không Bến Đợi',
        cover: 'https://i.ytimg.com/vi/bOZAdBsYVTg/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBbiZkDUx-SBnZcKIZjPkHwcODCAA',
        artist: 'Trungg I.U',
    },
    {
        path: 'assets/Xin Đừng Lặng Im - Soobin Hoàng Sơn.mp3',
        displayName: 'Xin Đừng Lặng Im',
        cover: 'https://i.ytimg.com/vi/xjqxc5-euP8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDTZ4Vo-FKIiC81ZFBM_4RP9PnxHg',
        artist: 'Soobin Hoàng Sơn',
    },
    {
        path: 'assets/Khuôn Mặt Đáng Thương - Sơn Tùng.mp3',
        displayName: 'Khuôn Mặt Đáng Thương',
        cover: 'https://i.ytimg.com/vi/0JePgrZ5zxs/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIE8oSTAP&rs=AOn4CLD88EWmt_WVc1Yq0qlZ6_YxNMCfGg',
        artist: 'Sơn Tùng',
    },
    {
        path: 'assets/Để Dành Khi Thức Giấc.mp3',
        displayName: 'Để Dành Khi Thức Giấc',
        cover: 'https://i.ytimg.com/vi/S6x-p6Vfyew/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBI5-4hD_CdyTcvzXY1vqq9rlywHw',
        artist: 'SIVAN',
    },
    {
        path: 'assets/Lao Tâm Khổ Tứ _ Thanh Hưng.mp3',
        displayName: 'Lao Tâm Khổ Tứ',
        cover: 'https://i.ytimg.com/vi/TfKOFRpqSME/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCDF4Sn1-1wnAf_De2rlyb0z9myFQ',
        artist: 'Thanh Hưng',
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