const socket = io({
    auth: {
        cookie: document.cookie
    }
});
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    document.cookie = 'token; Max-Age=0';
    location.assign('/login');
})




socket.on('all_messages', function(msgArray){
    msgArray.foreach(msg => {
        let item = document.createElement('li');
        item.textContent = msg.login + ':' + msg.content;
        window.scrollTo(0, document.body.scrollHeight);
    });
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('new_message', input.value);
        input.value = '';
    }
});

socket.on('message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

