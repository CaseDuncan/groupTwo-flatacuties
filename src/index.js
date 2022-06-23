// Initializing Variables
const characterVotes = document.querySelector("#vote-count");
const characterInformation = document.querySelector("#detailed-info");
const characterBar = document.querySelector("#character-bar");
const characterUrl = "http://localhost:3000/characters";



// adding character names to the bar
const addToCharacterBar = (character) => {
    const span = document.createElement("span"); // creating a span element // Deliverable 1
    span.textContent = character.name;
    characterBar.appendChild(span);
    span.addEventListener("click", () => {
        const charName = characterInformation.querySelector("#name");
        const charImage = characterInformation.querySelector("#image");

        charName.textContent = character.name;
        charImage.src = character.image;
    })
}



// adding characters to the bar
fetch(characterUrl)
    .then(response => response.json())
    .then(characters => {
        const name = characterInformation.querySelector("#name");
        const image = characterInformation.querySelector("#image");

        name.textContent = characters[0].name; // character at index 0
        image.src = characters[0].image;
        characterVotes.textContent = characters[0].votes;

        characters.forEach(character => addToCharacterBar(character)); // all characters // Deliverable 2
    })
    .catch(error => console.log(error));


    // Adding an event listener to the reset button
const resetButton = document.querySelector('#reset-btn')
resetButton.addEventListener('click' , (event) =>{
    fetch("http://localhost:3000/characters")
    .then (res => res.json())
    .then (characters =>{
        const characterName = document.querySelector('#name')
        const characterID = characters.find(character => character.name === characterName.textContent)
        fetch(`${"http://localhost:3000/characters"}/${characterID.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type" : 'application/json'
            },
            body:JSON.stringify({
                votes: 0
            })
        })
        .then(res => res.json())
        .then(character =>{
            characterVotes.textContent = character.votes
            console.log(character.votes)
        })
    })
})
