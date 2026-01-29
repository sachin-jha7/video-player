let vidInp = document.querySelector("input");
// let video = document.querySelector("video");
let videoName = document.querySelector(".video-name");
let placeholder = document.querySelector(".video-input-box");
let label = document.querySelector(".clone-btn");
let card = document.querySelector(".card");
let videoContainer = document.querySelector(".video-container");

label.style.display = "none";

vidInp.addEventListener("change", (e) => {
    let file = e.target.files[0];
    console.log(file);
    let str = '';
    for (let i = 0; i < file.name.length; i++) {
        if (i > 37) {
            break;
        }
        str = str + file.name[i];
    }
    let link = URL.createObjectURL(file);
    createCard(str, link);
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

    console.log(allCards);
}

let videoToPlay = document.querySelector(".video-player-box video");
let videoPlayerBox = document.querySelector(".video-player-box");
document.querySelector(".cross-btn").addEventListener("click", () => {
    videoPlayerBox.style.top = "100%";
})
function videoPlayer() {
    console.log(this.firstChild);
    videoToPlay.src = this.firstChild.src;
    videoPlayerBox.style.top = "0";
    // this.firstChild.currentTime = 0;
}
