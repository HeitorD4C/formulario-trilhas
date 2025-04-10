const inputs = document.querySelectorAll('.campo__input');
const buttons = document.querySelectorAll('.botao');
const senha = localStorage.Senha || localStorage.senha
const usuario = localStorage.usuario || localStorage.Usuario
let users = JSON.parse(localStorage.getItem('users'));

buttons.forEach(function (button) {
    button.addEventListener('click', () => {
        if (button.classList.contains('botao--secundario')) {
            window.location.href = 'register.html';
        } else {
            removeSpan();
            if (inputValidate()) {
                window.location.href = 'index.html';
            }
        }
    });
});

function inputValidate() {
    let isValid = false;
    let userFound = false;

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (inputs[0].value === user.name) {
            userFound = true;

            if (inputs[1].value === user.password) {
                isValid = true;
                removeSpan();
                break;
            } else {
                addSpan(inputs[1], 'Senha incorreta!');
            }
        }
    }

    if (!userFound) {
        addSpan(inputs[0], 'Usuário não encontrado!');
    }

    return isValid;
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

function removeSpan() {
    inputs.forEach(input => {
        const parent = input.closest('.campo');
        const existingSpan = parent.querySelector('.span--aviso');

        if (existingSpan) {
            parent.removeChild(existingSpan);
        }
    })
}