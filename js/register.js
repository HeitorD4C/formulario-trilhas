const nomeUsuario = document.querySelector('#nome--usuario');
const senha = document.querySelector('#senha');
const confirmaSenha = document.querySelector('#confirmaSenha');
const cadastroBtn = document.querySelector('.botao');
const campos = document.querySelectorAll('.campo__input');


cadastroBtn.addEventListener('click', () => {
    if (validate() === true) {

        alert('Sucesso!');
        localStorage.setItem('usuario', nomeUsuario.value);
        localStorage.setItem('Senha', senha.value);
        window.location.href = 'loguin.html';
    }
})

function validate() {
    let isValid = true;
    // expressão regular para regras específicas
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`=|-]).{6,}$/;

    campos.forEach((input) => {

        if (input.value === "") {
            addSpan(input, 'Campos Obrigatórios!');
            isValid = false;
        }
        else {
            removeSpan(input);
        }
    })

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