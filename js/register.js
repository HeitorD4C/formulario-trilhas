import { registerUser } from "./localStorage.js";

const nomeUsuario = document.querySelector('#nome--usuario');
const senha = document.querySelector('#senha');
const confirmaSenha = document.querySelector('#confirmaSenha');
const cadastroBtn = document.querySelector('.botao');
const campos = document.querySelectorAll('.campo__input');


cadastroBtn.addEventListener('click', () => {
    if (validate() === true) {

        alert('Sucesso!');
        registerUser();
        window.location.href = 'login.html';
    }
})

function validate() {
    let isValid = true;
    let users = JSON.parse(localStorage.getItem('users'));
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`=|-]).{6,}$/;

    campos.forEach((input) => {
        if (input.value === "") {
            addSpan(input, 'Campos Obrigatórios!');
            isValid = false;
        }
        else {
            removeSpan(input);
        }
    });

    if (users) {
        for (let i = 0; i < users.length; i++) {
            if (nomeUsuario.value === users[i].name) {
                addSpan(campos[0], 'Usuário já existe!');
                isValid = false;
                break
            }
            else {
                removeSpan(nomeUsuario);
            }
        }
    }

    if (isValid) {
        if (senha.value != confirmaSenha.value) {
            addSpan(senha, 'As senhas não coincidem!');
            addSpan(confirmaSenha, 'As senhas não coincidem!');
            isValid = false;
        }
        else {
            if (regex.test(senha.value) === false) {
                addSpan(senha, 'Senha Inválida!');
                isValid = false;
            }
        }
    }

    return isValid
}

function addSpan(input, messageErro) {
    const parent = input.closest('.campo');
    const existingSpan = parent.querySelector('.span--aviso');

    if (existingSpan) {
        return
    }

    const span = document.createElement('span');

    span.textContent = `${messageErro}`;
    span.classList.add('span--aviso');
    parent.appendChild(span);
}

function removeSpan(input) {
    const parent = input.closest('.campo');
    const existingSpan = parent.querySelector('.span--aviso');

    if (existingSpan) {
        parent.removeChild(existingSpan);
    }
}