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
