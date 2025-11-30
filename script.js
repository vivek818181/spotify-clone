
console.log("Let write javascript")
let currentSong = new Audio();
const play = document.getElementById("play");
function convertToMinutes(seconds) {
    // let mins = Math.floor(seconds / 60);
    // let secs = seconds % 60;

    // // Add leading zero if needed
    // let m = mins < 10 ? "0" + mins : mins;
    // let s = secs < 10 ? "0" + secs : secs;

    // return `${m}:${s}`;
    seconds = Math.floor(seconds); // ensure integer

    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
}

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    
    console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    console.log(as)

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {

            const decoded = decodeURIComponent(element.href);
            const normalized = decoded.replace(/\\/g, "/"); 
            const fileName = normalized.split("/").pop();    

            songs.push(fileName)
        }
    }

    return songs
}
const playMusic = (track,pause=true)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track;
    if(!pause){
        currentSong.play()
    }
    currentSong.play()
     play.src = " pause.svg"
     document.querySelector(".songinfo").innerHTML= track
     document.querySelector(".songtime").innerHTML="00:00/00:00"
}

async function main() {

    let songs = await getSongs()
    playMusic(songs[0],true)
    console.log(songs)

    let SongUL = document.querySelector(".songList ul")

    for (const song of songs) {
        
        SongUL.innerHTML += `<li>
        
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div> ${song}</div>
                                <div>SongArtice</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                           </li>`;
    }

    
    // Attach an event listener to each song 
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    // Attach an event listener to play next and previous song 
    play.addEventListener("click", ()=>{
        if (currentSong.paused){
            currentSong.play()
            play.src = " pause.svg"
            document.querySelector(".songinfo").innerHTML=track;
            document.querySelector(".songtime").innerHTML="00:00 / 00:00"
        }else{
            currentSong.pause()
            play.src = " play.svg"
        }
    })
    // listen  for time update event 
    currentSong.addEventListener("timeupdate", () =>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML =`${convertToMinutes(currentSong.currentTime)}/${convertToMinutes(currentSong.duration)}`
    })
}

main()

