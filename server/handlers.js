
let socketUsers = {}; // wanna use Database instead later
let clientRooms = {};

function makeid(length) {
    let result = ""
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length
    for ( let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
    
}

function handleJoin(client) {

    const randomAvatars = [`🧋`, `☕️`, `💩`, `💃`, `🦊`, `🦄`];

    const avatarIndex = Math.floor(Math.random() * randomAvatars.length);

    const player = {
        socketId: client.id,
        username: 'chicken',
        avatar: randomAvatars[avatarIndex]
    };

    socketUsers[client.id] = player; // will need to insert into database

    // socket.join("gameRoom");
    // console.log(`${socket.id} is now in the room`);

    // const clients = io.in('gameRoom').allSockets(); // RETURNS PROMISE
    // console.log('CLIENTS', clients);

    console.log(`${player.socketId} has joined the game`);
    return socketUsers

}

function handleDisconnect(client) {
    console.log(client.id, 'has been disconnected :(((');

    delete socketUsers[client.id];

    return socketUsers;
}

function handleCreateLobby(client) {
    let roomName = makeid(5)
    clientRooms[client.id] = roomName;
    client.emit('lobbyCode', roomName)


    client.join(roomName)
    client.emit('init')
}

function handleJoinLobby(client, lobbyCode, room) {
    
    let allUsers;
    if (room) {
        allUsers = room
    }

    let numClients = 0
    if (allUsers) {
        numClients = allUsers.size
    }

    if (numClients === 0) {
        client.emit('unknownGame')
        return
    }

    clientRooms[client.id] = lobbyCode

    client.join(lobbyCode)
    client.emit('init')
}

function handleStartGame(socketRoom) {
    
}



module.exports = {
    handleJoin,
    handleDisconnect,
    handleCreateLobby,
    handleJoinLobby,
    handleStartGame
}
