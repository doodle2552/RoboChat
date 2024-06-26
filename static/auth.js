const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('loginBtn');
const regBtn = document.getElementById('regBtn');


registerForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const {login, password, passwordRep} = registerForm;
    if(password.value !== passwordRep.value) {
        return alert('Password invalid');
    }
    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/register');
    xhr.send(user);
    xhr.onload = () => alert(xhr.response);
})

loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const {login, password} = loginForm;
    const user = JSON.stringify({
        login: login.value,
        password:password.value
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/login');
    xhr.send(user);
    xhr.onload = () => {
        if(xhr.status === 200) {
            const token = xhr.response;
            document.cookie = `token=${token}`;
            window.location.assign('/');
        }
        else {
            return alert(xhr.response);
        }
    }

});


loginBtn.addEventListener('click', (e)=> {
    location.assign('/login');
});

