let pokeData

$input = $('input[type="text"]')

function handleGetData(event) {
    event.preventDefault()

    $.ajax({url:`https://pokeapi.co/api/v2/pokemon/${$input.val()}`}).then(
        function(data) {
            pokeData = data
            // clear()
            render()
        },

        function(error) {
            console.log("there was an error: ", error)
        }
    )
}

function render() {
    $('#parent').append(`<img src="${pokeData.sprites.front_default}" id="poster">`)
    $('#parent').append(`<div>NO. ${pokeData.id}</div>`)
    $('#parent').append(`<div>NAME: ${pokeData.name}</div>`)
    $('#parent').append(`<div>HEIGHT: ${pokeData.height}</div>`)
    $('#parent').append(`<div>WEIGHT: ${pokeData.weight}</div>`)
    abilitiesRender(pokeData.abilities)
    movesRender(pokeData.moves)
}

function abilitiesRender(data) {
    $('#parent').append(`<div id="ability">ABILITIES: </div>`)
    for (let i = 0; i < data.length; i++) {
        $('#ability').append(`${data[i].ability.name} | `)
    }
}

function movesRender(data) {
    $('#parent').append(`<div id="moveset">MOVES: </div>`)
    for (let i = 0; i < data.length; i++) {
        $('#moveset').append(`${data[i].move.name} | `)
    }
}

function clear() {
    let divs = document.getElementsByTagName('div')
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = ""
    }
}

$('form').on('submit', handleGetData);