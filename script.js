const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search");

btn.addEventListener("click", () => {
    let ipword = document.getElementById("ip").value;
    console.log(ipword);

    fetch(`${url}${ipword}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            let audioUrl = '';
            if (data[0] && data[0].phonetics && data[0].phonetics.length > 0) {
                audioUrl = data[0].phonetics[0].audio || '';
            }

            result.innerHTML = `
                <div class="word">
                    <br/>
                    <h3>${ipword}</h3>
                    <button class="audio" onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
                </div>
                <br/>
                <p class="meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>`;

            if (audioUrl) {
                sound.setAttribute("src", audioUrl);
            } else {
                console.error('No audio URL found.');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            result.innerHTML = `<p>Error fetching data for the word: ${ipword}</p>`;
        });
});

function playSound() {
    if (sound.src) {
        sound.play().catch((error) => {
            console.error('Error playing audio:', error);
        });
    } else {
        console.error('Audio source not set.');
    }
}
