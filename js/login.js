const inputs = document.querySelectorAll('.campo__input');
const buttons = document.querySelectorAll('.botao');
const senha = localStorage.Senha || localStorage.senha
const usuario = localStorage.usuario || localStorage.Usuario


buttons.forEach(function (button) {
    button.addEventListener('click', () => {
        if(button.classList.contains('botao--secundario')) {
            window.location.href = 'register.html';
        }else{
            if(inputValidate() === true) {
                window.location.href = 'index.html';
            }
        }
    });
});

function inputValidate() {
    isValid = null;
    
    inputs.forEach(function(input) {
        if(!input.validity.valid || input.value === ''){
            addSpan(input);
            isValid = false;
        }else {
            removeSpan(input);
            isValid = true;
        }
    });

    
    if (inputs[0].value !== usuario || inputs[1].value !== senha) {
        isValid = false;

    } else {
        isValid = true
    }
    return isValid
}

function addSpan(input) {
    const parent = input.closest('.campo');
    const existingSpan = parent.querySelector('.span--aviso');

    if(existingSpan) {
        return
    }

    const loguinOrPassword = (input.getAttribute('type') === 'password') ? 'Senha incorreta' : 'Usuário incorreto';
    const span = document.createElement('span');

    span.textContent = `${loguinOrPassword}`;
    span.classList.add('span--aviso');
    parent.appendChild(span);
}

function removeSpan(input) {
    const parent = input.closest('.campo');
    const existingSpan = parent.querySelector('.span--aviso');

    if(existingSpan) {
        parent.removeChild(existingSpan);
    }
}