let vidInp = document.querySelector("input");
let videoName = document.querySelector(".video-name");
let placeholder = document.querySelector(".video-input-box");
let label = document.querySelector(".clone-btn");


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
        card.removeEventListener("click", setVideoInfo);
    }
    for (let card of allCards) {
        card.addEventListener("click", setVideoInfo);
    }

    // console.log(allCards);
}

let videoToPlay = document.querySelector(".video-player-box video");

function setVideoInfo() {
    videoToPlay.src = this.firstChild.src;
    videoPlayerBox.style.top = "0";
    document.querySelector(".duration-info .right").innerText = formateTime(this.firstChild.duration);
    videoToPlay.play();
    playBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
}



let videoPlayerBox = document.querySelector(".video-player-box");

document.querySelector(".cross-btn").addEventListener("click", () => {
    videoPlayerBox.style.top = "100%";
    videoToPlay.pause();
});


// Toggle between play & pause on button click

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


// Time conversion function

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


// Update duration and move progress ball and increase width of progress-fill

videoToPlay.addEventListener("timeupdate", (event) => {
    let { currentTime, duration } = event.target;
    document.querySelector(".duration-info .left").innerText = formateTime(currentTime);
    document.querySelector(".duration-info .right").innerText = formateTime(duration);
    let percent = (currentTime / duration) * 100;

    document.querySelector(".progress-bar .progress-fill").style.setProperty('--progress-width', percent + '%');
    document.querySelector(".progress-bar .ball").style.left = percent + "%";
});


// Enter and Exit Full Screen

let fullScreenEnterBtn = document.querySelector(".fullscreen");
let exitFullScreenBtn = document.querySelector(".exit-fullscreen");

fullScreenEnterBtn.addEventListener("click", () => {

    if (videoPlayerBox.requestFullscreen) {
        videoPlayerBox.requestFullscreen().then(() => {
            if (videoToPlay.videoWidth > videoToPlay.videoHeight) {
                screen.orientation.lock("landscape")
                    .then(() => console.log("orientation locked to landsacpe"))
                    .catch(err => console.log(err));
            } else {
                screen.orientation.lock("portrait")
                    .then(() => console.log("orientation locked to portrait"))
                    .catch(err => console.log(err));
            }

        }).catch(err => console.log(err));
    } else if (videoPlayerBox.mozRequestFullScreen) {
        videoPlayerBox.mozRequestFullScreen().then(() => {
            if (videoToPlay.videoWidth > videoToPlay.videoHeight) {
                screen.orientation.lock("landscape")
                    .then(() => console.log("orientation locked to landsacpe"))
                    .catch(err => console.log(err));
            } else {
                screen.orientation.lock("portrait")
                    .then(() => console.log("orientation locked to portrait"))
                    .catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    } else if (videoPlayerBox.webkitRequestFullScreen) {
        videoPlayerBox.webkitRequestFullScreen().then(() => {
            if (videoToPlay.videoWidth > videoToPlay.videoHeight) {
                screen.orientation.lock("landscape")
                    .then(() => console.log("orientation locked to landsacpe"))
                    .catch(err => console.log(err));
            } else {
                screen.orientation.lock("portrait")
                    .then(() => console.log("orientation locked to portrait"))
                    .catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
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


// Skip the video on button click

let forwardBtn = document.querySelector(".forward-btn");
let backwardBtn = document.querySelector(".backward-btn");

forwardBtn.addEventListener("click", () => {
    videoToPlay.currentTime += 10;
});

backwardBtn.addEventListener("click", () => {
    videoToPlay.currentTime -= 10;
});

document.querySelector(".progress-bar").addEventListener("click", (event) => {
    let width = document.querySelector(".progress-bar").clientWidth;
    videoToPlay.currentTime = (event.offsetX / width) * videoToPlay.duration;
});


// hide and show the control panel when user hover on the video screen

let timer;
const hideControls = () => {
    if (videoToPlay.paused) return;
    timer = setTimeout(() => {
        document.querySelector(".wrapper").style.bottom = "-100%";
        videoToPlay.style.filter = `brightness(100%)`;
    }, 3000);
}
hideControls();

videoPlayerBox.addEventListener("mousemove", () => {
    document.querySelector(".wrapper").style.bottom = "0";
    videoToPlay.style.filter = `brightness(70%)`;
    clearTimeout(timer);
    hideControls();
});

// for touchscreen device

videoPlayerBox.addEventListener("touchstart", () => {
    document.querySelector(".wrapper").style.bottom = "0";
    clearTimeout(timer);
    hideControls();
});




// skip the video on swiping left or right

let touchStartX = 0;
let touchEndX = 0;
let side = "";

document.addEventListener("touchstart", (event) => {
    // console.log(event.touches[0].clientX);
    touchStartX = event.touches[0].clientX;

    const screenWidth = window.innerWidth;
    side = (touchStartX < screenWidth / 2) ? "left" : "right";

    // console.log(`Touch started on ${side} side`);
});

document.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;

    handleGesture();
});


function handleGesture() {
    const horizontalDiff = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (Math.abs(horizontalDiff) > swipeThreshold && videoToPlay.src != "") {
        if (horizontalDiff > 0) {
            // console.log("swipe right");
            videoToPlay.currentTime += 10;
        } else {
            // console.log("swipe left");
            videoToPlay.currentTime -= 10;
        }
    }
}
