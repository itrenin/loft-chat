const io = require('socket.io').listen(3000);

io.sockets.on('connection', socket => {

    socket.on('message', (msg) => {
        let time = (new Date).toLocaleTimeString();

        if (msg.type === 'hello') {
            socket.json.send({
                'type': 'hello',
                'message': 'hello ' + (msg.nick) + ' ' + (msg.name) + ' !',
                'name': msg.name,
                'nick': msg.nick
            });
            socket.broadcast.json.send({
                'type': 'announce',
                'message': time + ' к нам присоединился ' + msg.nick,
                'name': msg.name,
                'nick': msg.nick
            });
            console.log(msg.nick + ' connected ' + time);
        }
    })
});

// socket.send('hello ' + (msg) + ' !');
// socket.broadcast.send(time + ' к нам присоединился ' + msg);
// console.log(msg + ' connected ' + time);