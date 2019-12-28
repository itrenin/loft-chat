/* eslint-disable no-undef */
import 'normalize.css';
import './style/index.scss';
import showUsers from './templates/userList.hbs';
// import '../socket.io/socket.io';
const io = require('socket.io-client');

const authtButton = document.querySelector('#authBtn');
const nick = document.querySelector('#nick');
const fullname = document.querySelector('#fullName');
const authForm = document.querySelector('.authBlock');
const usersList = document.querySelector('#users-list');

authtButton.addEventListener('click', (e) => {
    e.preventDefault;
    iochat(nick.value, fullname.value);
});

function iochat(nick, name) {
    let socket = io.connect('http://localhost:3000/');
    const users = [];

    socket.on('connect', () => {
        socket.json.send({ 'type': 'hello', 'nick': nick, 'name': name });
        console.log(name);
        socket.on('message', msg => {
            if (msg.type === 'hello' || 'announce') {
                authForm.style.visibility = 'hidden';
                // alert(msg.message);

                const usersObj = {};

                users.push({ fullName: `${msg.name}` })
                usersObj.usersList = users
                console.log(usersObj);
                document.cookie = `'user'=${nick}`;

                usersList.innerHTML = showUsers(usersObj);
                // if (msg.type === 'announce'){
                //     socket.json.send({ 'type': 'hello', 'nick': nick, 'name': name });
                // }
            }
        })
    })
}

