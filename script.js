let vidInp = document.querySelector("input");
// let video = document.querySelector("video");
let videoName = document.querySelector(".video-name");
let placeholder = document.querySelector(".video-input-box");
let label = document.querySelector(".clone-btn");
let card = document.querySelector(".card");
let videoContainer = document.querySelector(".video-container");

label.style.display = "none";

vidInp.addEventListener("change", (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i];
        // console.log(file);
        let str = '';
        for (let i = 0; i < file.name.length; i++) {
            if (i > 37) {
                break;
            }
            str = str + file.name[i];
        }
        let link = URL.createObjectURL(file);
        createCard(str, link);
    }

    document.querySelector("h2").innerText = "Your Playlist";
    placeholder.style.display = "none";
    document.querySelector(".card-container").style.display = "grid";
    label.style.display = "flex";
});



let createCard = (name, src) => {
    let card = document.createElement("div");
    let p = document.createElement("p");
    p.classList.add("video-name");
    card.classList.add("card");
    p.innerText = name;
    let video = document.createElement("video");
    video.classList.add("video");
    video.src = src;
    video.controls = false;
    video.addEventListener("loadedmetadata", () => {
        if (video.duration > 900) {
            video.currentTime = 10;
            return;
        }
        video.currentTime = 1;
    });
    card.append(video);
    card.append(p);
    document.querySelector(".card-container").append(card);

    let allCards = document.querySelectorAll(".card-container .card");
    for (let card of allCards) {
        card.removeEventListener("click", videoPlayer);
    }
    for (let card of allCards) {
        card.addEventListener("click", videoPlayer);
    }

    // console.log(allCards);
}

let videoToPlay = document.querySelector(".video-player-box video");
let videoPlayerBox = document.querySelector(".video-player-box");

document.querySelector(".cross-btn").addEventListener("click", () => {
    videoPlayerBox.style.top = "100%";
    videoToPlay.pause();
});

function videoPlayer() {
    // console.log(this.firstChild);
    videoToPlay.src = this.firstChild.src;
    videoPlayerBox.style.top = "0";
    document.querySelector(".duration-info .right").innerText = formateTime(this.firstChild.duration);
    videoToPlay.play();
    playBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
    // this.firstChild.currentTime = 0;
}

let playBtn = document.querySelector(".play-btn");


playBtn.addEventListener("click", () => {

    if (videoToPlay.paused) {
        playBtn.querySelector("i").classList.replace("fa-play", "fa-pause");

    } else {
        playBtn.querySelector("i").classList.replace("fa-pause", "fa-play");

    }

    videoToPlay.paused ? videoToPlay.play() : videoToPlay.pause();
});

videoToPlay.addEventListener("ended", () => {

    playBtn.querySelector("i").classList.replace("fa-pause", "fa-play");
});

const formateTime = (time) => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoToPlay.addEventListener("timeupdate", (event) => {
    let { currentTime, duration } = event.target;
    document.querySelector(".duration-info .left").innerText = formateTime(currentTime);
    document.querySelector(".duration-info .right").innerText = formateTime(duration);
    let percent = (currentTime / duration) * 100;
    // percent = `${percent}px` - `${15}px`;
    document.querySelector(".progress-bar .progress-fill").style.setProperty('--progress-width', percent + '%');
    document.querySelector(".progress-bar .ball").style.left = percent + "%";
    // document.querySelector(".progress-bar").style.width = `${percent}%`
});

let fullScreenEnterBtn = document.querySelector(".fullscreen");
let exitFullScreenBtn = document.querySelector(".exit-fullscreen");


fullScreenEnterBtn.addEventListener("click", () => {
    if (videoPlayerBox.requestFullscreen) {
        videoPlayerBox.requestFullscreen();
    } else if (videoPlayerBox.mozRequestFullScreen) {
        videoPlayerBox.mozRequestFullScreen();
    } else if (videoPlayerBox.webkitRequestFullScreen) {
        videoPlayerBox.webkitRequestFullScreen();
    }

    fullScreenEnterBtn.style.display = "none";
    exitFullScreenBtn.style.display = "block";
    document.querySelector(".cross-btn").style.display = "none";
    // videoPlayerBox.style.transform = `rotate(270deg)`;
});

exitFullScreenBtn.addEventListener("click", () => {

    if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    fullScreenEnterBtn.style.display = "block";
    exitFullScreenBtn.style.display = "none";
    document.querySelector(".cross-btn").style.display = "block";
    // videoPlayerBox.style.transform = `rotate(-270deg)`;
});

let forwardBtn = document.querySelector(".forward-btn");
let backwardBtn = document.querySelector(".backward-btn");

forwardBtn.addEventListener("click", () => {
    videoToPlay.currentTime += 10;
});

backwardBtn.addEventListener("click", () => {
    videoToPlay.currentTime -= 10;
});

let timer;
const hideControls = () => {
    if (videoToPlay.paused) return;
    timer = setTimeout(() => {
        document.querySelector(".wrapper").style.bottom = "-100%";
    }, 3000);
}
hideControls();

videoPlayerBox.addEventListener("mousemove", () => {
    document.querySelector(".wrapper").style.bottom = "0";
    clearTimeout(timer);
    hideControls();
});
videoPlayerBox.addEventListener("touchstart", () => {
    document.querySelector(".wrapper").style.bottom = "0";
    clearTimeout(timer);
    hideControls();
});
