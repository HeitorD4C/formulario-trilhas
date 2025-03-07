const form = document.querySelector('form');
const inputs = document.querySelectorAll('.campo__input');
const inputsUpload = document.querySelectorAll('.campo__upload');

// Máscaras dos dados
$(document).ready(function(){
    $('#data-de-nascimento').mask('00/00/0000');
    $('#cpf').mask('000.000.000-00', {reverse: false});
    $('#telefone').mask('(00) 00000-0000');
    $('#cep').mask('00000-000');
});

// Verifica pra cada input se ele está preenchido corretamente
inputs.forEach(function (input) {
    input.addEventListener('change', function(e) {
        validate(input, e);
    });
});

// Verifica os inputs de upload
inputsUpload.forEach(function(inputUpload) {
    const fileInput = inputUpload.querySelector('input[type="file"]');
    fileInput.addEventListener('change', function(e) {
        validate(fileInput, e);
        uploadArquive(fileInput, e);
    });
});

// Valida se um input está correto e adiciona ou remove a classe campo--incorreto
function validate(input, event) {
    let isValid;

    if (input.type === 'file') {
        // Validação para inputs de arquivo
        isValid = (event.target.files.length === 1);
    } else {
        // Validação para outros inputs
        isValid = input.validity.valid;
    }

    toggleIncorretClass(input, !isValid);
}

// Adiciona ou remove a classe campo--incorreto de um elemento pai (as divs de classe campo)
function toggleIncorretClass(element, isIncorrect) {
    const parent = element.closest('.campo'); // Encontra o elemento pai mais próximo com a classe .campo
    const span = parent.querySelector('span');

    if (isIncorrect) {
        if (!parent.classList.contains('campo--incorreto')) {
            span.textContent = 'Preencha o campo corretamente';
            parent.classList.add('campo--incorreto');
        }
    } else {
        if (parent.classList.contains('campo--incorreto')) {
            span.textContent = '';
            parent.classList.remove('campo--incorreto');
        }
    }
}

function uploadArquive(input, e) {
    const p = input.previousElementSibling;

    if(e.target.files.length < 1){
        p.innerHTML = 'Clique aqui para <br> selecionar o arquivo';
        return
    }

    const arqName = e.target.files[0].name;
    p.innerHTML = `Arquivo recebido! <br> ${arqName}`; 
}