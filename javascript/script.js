const search = document.getElementById("search");
const display = document.querySelector(".display");
const word = document.querySelector(".word");
const text = document.querySelector(".mute-word");
const content = document.querySelector(".content");
const sound = document.getElementById('sound');


const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";


search.addEventListener("click", event => {
    const inputVal = document.getElementById("input").value;
    event.preventDefault();

    if(inputVal){
        display.style.display = "block";

        fetch(`${url}${inputVal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
                display.innerHTML = 
                `
                    <div class="searched-word">
                        <h3 class="word"> ${inputVal} </h3>
                        <i class="fa fa-volume-up" onclick="playSound()"></i>
                    </div>
        
                    <div class="mute-word"> ${data[0].meanings[0].partOfSpeech} ${data[0].phonetic || data[0].phonetics[1].text} </div>
        
                    <p class="content mt-3">
                        ${data[0].meanings[0].definitions[0].definition}
                    </p>

                    <p class="word-example mt-3">
                        ${data[0].meanings[0].definitions[0].example || ""}
                    </p>
                `
                ;
                sound.setAttribute('src', `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`);
        })
        .catch(err => {
            alert("Please use a correct word");
        });

    } else{
        alert("Please fill the input ..");
    }
});

function playSound(){
    sound.play();
}