const socket = io.connect();
let lobbyActive = false

// ERROR

socket.on('error', function (err) {
    console.log('received socket error:', err);
})

// JOIN

socket.on('join', (users) => {

    const section_player = document.getElementsByClassName("section-players")[0];

    const userPropertiesArr = Object.values(users);
    section_player.innerHTML = ""; // stop it from appending

    for (let userProperty of userPropertiesArr) {
        section_player.innerHTML += '<p>' + userProperty.avatar + '</p>';
    }
})



// LEAVE

socket.on('leave', (users) => {

    const section_player = document.getElementsByClassName("section-players")[0];

    const userPropertiesArr = Object.values(users);
    section_player.innerHTML = ""; // stop it from appending

    for (let userProperty of userPropertiesArr) {
        section_player.innerHTML += '<p>' + userProperty.avatar + '</p>';
    }
})



socket.on('init', initLobby)
socket.on('lobbyCode', handleLobbyCode)

const lobbyList = document.getElementById('lobbyList');
const lobbyScreen = document.getElementById('lobbyScreen')
const newGameButton = document.getElementById('newGameButton')
const joinGameButton = document.getElementById('joinGameButton')
const startGameButton = document.getElementById('startGameButton')
const lobbyCodeInput = document.getElementById('lobbyCodeInput')
const lobbyCodeDisplay = document.getElementById('lobbyCodeDisplay')


newGameButton.addEventListener('click', newGame)
joinGameButton.addEventListener('click', joinGame)
startGameButton.addEventListener('click', startGame)

function newGame() {
    socket.emit('user_creates_lobby')
    initLobby()
}

function joinGame() {
    const code = lobbyCodeInput.value
    socket.emit('user_joins_lobby', code)
    initLobby()
}

function startGame() {
    lobbyCodeDisplay.innerText = code
    socket.emit('user_starts_game', code)
    initGame()
}

function initLobby() {
    lobbyList.style.display = 'none'
    lobbyScreen.style.display = 'block'

    lobbyActive = true
}

function handleLobbyCode(lobbyCode) {
    lobbyCodeDisplay.innerText = lobbyCode
}

function reset() {
    lobbyCodeInput.value = ''
    lobbyCodeDisplay.innerText = ''
    lobbyList.style.display = 'block'
    lobbyScreen.style.display = 'none'
}

function handleUnkownGame() {
    reset()
    alert('Unknown game code')
}