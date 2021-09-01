let pokeData

$input = $('input[type="text"]')

function handleGetData(event) {
    event.preventDefault()

    $.ajax({url:`https://pokeapi.co/api/v2/pokemon/${$input.val().toLowerCase()}`}).then(
        function(data) {
            pokeData = data
            clear()
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
    $('#parent').append(`<div>NAME: ${capitalize(pokeData.name)}</div>`)
    $('#parent').append(`<div>HEIGHT: ${(pokeData.height * 10 / 30.48).toFixed(2)} feet | ${(pokeData.height * 10 )} cm</div>`)
    $('#parent').append(`<div>WEIGHT: ${(pokeData.weight / 4.536).toFixed(2)} lbs | ${(pokeData.weight / 10)} kg</div>`)
    typesRender(pokeData.types)
    abilitiesRender(pokeData.abilities)
    movesRender(pokeData.moves)
}

function typesRender(data) {
    $('#parent').append(`<div id="type">TYPE: </div>`)
    for (let i = 0; i < data.length; i++) {
        $('#type').append(`${capitalize(data[i].type.name)} | `)
    }
}

function abilitiesRender(data) {
    $('#parent').append(`<div id="ability">ABILITIES: </div>`)
    for (let i = 0; i < data.length; i++) {
        $('#ability').append(`${capitalize(data[i].ability.name)} | `)
    }
}

function movesRender(data) {
    $('#parent').append(`<div id="moveset">MOVES: </div>`)
    for (let i = 0; i < data.length; i++) {
        $('#moveset').append(`${capitalize(data[i].move.name)} | `)
    }
}

function clear() {
    let divs = document.getElementsByTagName('div')
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = ""
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onscroll = function() {
    stickyNav()
}

var nav = document.querySelector("nav")
var sticky = nav.offsetTop

function stickyNav() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("sticky")
  } else {
    nav.classList.remove("sticky")
  }
}

$('form').on('submit', handleGetData)