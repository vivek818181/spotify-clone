
console.log("Let write javascript")
let currentSong = new Audio();

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
const playMusic = (track)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track;
    currentSong.play()
     play.src = " pause.svg"
}

async function main() {

    let songs = await getSongs()
    console.log(songs)

    let SongUL = document.querySelector(".songList ul")

    for (const song of songs) {
        // ✅ FIXED (innerHTM → innerHTML AND using +=)
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
}

main()

