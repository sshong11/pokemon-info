let pokeData

fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=0').then(response => response.json()).then(function(data) {
    var pokeCount = data.count
    if ($('body').is('.allpoke')) {
        for (let i = 1; i <= pokeCount; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json()).then(function(data) {
                pokeData = data
                renderTable()
            })
        }
    }
})

$input = $('input[type="text"]')

function handleGetData(event) {
    event.preventDefault()

    $.ajax({url:`https://pokeapi.co/api/v2/pokemon/${$input.val().toLowerCase()}`}).then(
        function(data) {
            pokeData = data
            $('#error').html("")
            clear()
            render()
        },

        function(error) {
            console.log(error)
            errorMsg()
        }
    )
}
    
function render() {
    $('#parent').append(`<img src="${pokeData.sprites.front_default}" id="poster"><img src="${pokeData.sprites.front_shiny}" id="poster2">`)
    $('#parent').append(`<div class="info">NO. ${pokeData.id}</div>`)
    $('#parent').append(`<div class="info">NAME: ${capitalize(pokeData.name)}</div>`)
    $('#parent').append(`<div class="info">HEIGHT: ${(pokeData.height * 10 / 30.48).toFixed(2)} feet | ${(pokeData.height * 10 )} cm</div>`)
    $('#parent').append(`<div class="info">WEIGHT: ${(pokeData.weight / 4.536).toFixed(2)} lbs | ${(pokeData.weight / 10)} kg</div>`)
    typesRender(pokeData.types)
    abilitiesRender(pokeData.abilities)
    movesRender(pokeData.moves)
    $('#poster').css("animation", "fadeDown ease 1s")
    $('#poster2').css("animation", "fadeDown ease 1s")
    $('.info').css("animation", "fadeDown ease 2.5s")
    $('#movestable').css("animation", "fadeDown ease 3s")
}

function errorMsg() {
    $('#error').html('Enter a valid name or number')
}

function typesRender(data) {
    $('#parent').append(`<div id="type" class="info">TYPE: </div>`)
    for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
            $('#type').append(`${capitalize(data[i].type.name)}`)
        } else {
            $('#type').append(`${capitalize(data[i].type.name)} | `)
        }   
    }
}

function typesRTD(data) {
    var str = ""
    for (let i = 0; i < data.length; i++) {
        str += `${capitalize(data[i].type.name)} <br>`
    }
    return str
}

function abilitiesRender(data) {
    $('#parent').append(`<div id="ability" class="info">ABILITIES: </div>`)
    for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) {
            $('#ability').append(`${capitalize(data[i].ability.name)}`)
        } else {
            $('#ability').append(`${capitalize(data[i].ability.name)} | `)
        }
    }
}

function abilitiesRTD(data) {
    var str = ""
    for (let i = 0; i < data.length; i++) {
        str += `${capitalize(data[i].ability.name)} <br>`
    }
    return str
}

function movesRender(data) {
    // $('#parent').append(`<div id="moveset">MOVES: </div>`)
    // for (let i = 0; i < data.length; i++) {
    //     $('#moveset').append(`${capitalize(data[i].move.name)} | `)
    // }

    $('#parent').append(`<table id="movestable" align="center"><th id="movesth" colspan="4">MOVES</th></table>`)
    // $('#parent').append(`<th id="movesth" colspan="4">MOVES</th>`)
    let count = 0
    for (let i = 0; i < (data.length / 4); i++) {
        $('#movestable').append(`<tr id="moveset"></tr>`)
        for (let j = count; j < count + 4; j++) {
            if (j >= data.length) {
                break
            }
            $(`tr`).last().append(`<td>${capitalize(data[j].move.name)}</td>`)
        }
        count += 4
    }
}

function clear() {
    let divs = document.getElementsByTagName('div')
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = ""
    }
}

function renderTable() {
    $('table').append(`<tr>
    <td>${pokeData.id}</td>
    <td><img src="${pokeData.sprites.front_default}" id="tdposter"></td>
    <td>${capitalize(pokeData.name)}</td>
    <td>${typesRTD(pokeData.types)}</td>
    <td>${abilitiesRTD(pokeData.abilities)}</td>
    </tr>`)
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