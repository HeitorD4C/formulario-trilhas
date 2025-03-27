const inputs = document.querySelectorAll('.campo__input');

inputs.forEach(function (input) {
    input.setAttribute(required, '');
    input.addEventListener('blur', function(e) {
        inputValidate(input, e);
    })
});

function inputValidate(input, event) {
    if(!input.validity.valid){
        addSpanTag(input);
    }
}

function addSpanTag(input) {
    const parent = input.closest('.campo');
    const existingSpan = parent.querySelector('.span--aviso');
    
    if(existingSpan) {
        return
    }

    const span = document.createElement('span');
    span.classList.add('span--aviso');

    const typeInput = input.getAttribute('type');
    const loguinOrPassword = (typeInput === 'password') ? 'Senha' : 'Usuário';

    span.textContent = `${loguinOrPassword} incorreto!`;

    parent.appendChild(span);
}