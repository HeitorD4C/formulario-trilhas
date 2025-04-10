const inputs = document.querySelectorAll('.campo__input');
const selects = document.querySelectorAll('.campo__select');
const trilhas = document.querySelectorAll('.campo-botoes__input');
const terms = document.getElementById('aceitar-termos');
let users = [];

export function saveForm() {

    inputs.forEach(element => {
        localStorage.setItem(`${element.getAttribute('name')}`, `${element.value}`);
    });

    selects.forEach(element => {
        localStorage.setItem(`${element.getAttribute('name')}`, `${element.value}`);
    });

    trilhas.forEach(element => {
        localStorage.setItem(`${element.getAttribute('id')}`, `${element.checked}`);
    });

    localStorage.setItem('termos', `${terms.checked}`);

    alert('Dados salvos com sucesso!');
}

export function autoFillForm() {
    let cookie = null;

    inputs.forEach(element => {
        element.value = localStorage.getItem(`${element.getAttribute('name')}`);
    });

    selects.forEach(element => {
        cookie = localStorage.getItem(`${element.getAttribute('name')}`);
        if (cookie) {
            element.value = cookie;
        }
    });

    trilhas.forEach(element => {
        element.checked = (localStorage.getItem(`${element.getAttribute('id')}`) === 'true') ? true : false;
    })

    terms.checked = localStorage.getItem('termos') === 'true';
}

export function registerUser() {
    const user = {
        name: '',
        password: ''
    }

    inputs.forEach(element => {
        switch (element.getAttribute('id')) {
            case 'nome--usuario':
                user.name = element.value;
                break
            case 'senha':
                user.password = element.value;
                break
        }
    });

    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}