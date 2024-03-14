const btn = document.querySelector('.btn')
const card = document.getElementById('result')
const btnAudio = document.querySelector('.audio')
const partOfSpeech = document.querySelector('.partOfSpeech')
const phonetic = document.querySelector('.phonetic')
const definition = document.querySelector('.definition')
const audio = document.querySelector('audio')
const searchInput = document.querySelector('#search-input')
const cardTitle = document.getElementById('card-title')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    if (searchInput) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`)
            .then(res => res.json())
            .then(data => {
                let d = data[0]
                let numAudio = d.phonetics[0].audio || '' ? 0 : d.phonetics[1].audio ? 1 : 2
                addData(data[0].word, d.meanings[0].partOfSpeech, d.phonetic, d.phonetics[numAudio].audio || '', d.meanings[0].definitions[0].definition)
            })
            .catch( ()=>alert('please the correct word'))
    }
})
let addData = (titles, partOfSpeechs, phonetics, audios, definitions) => {
    definition.innerHTML = definitions
    cardTitle.innerHTML = titles
    phonetic.innerHTML = phonetics
    partOfSpeech.innerHTML = partOfSpeechs
    audio.src = audios
    card.style.display = "block"
}
btnAudio.addEventListener('click', () => audio.play())
