import { saveForm } from "./localStorage.js";

const form = document.querySelector('form');
const inputs = document.querySelectorAll('.campo__input');
const inputsUpload = document.querySelectorAll('.campo__input--file');
const buttons = document.querySelectorAll('.botao');
const terms = document.querySelector('#aceitar-termos');
const trilhas = document.querySelectorAll('.campo-botoes__input');
const rua = document.querySelector("#rua");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");
const cep = document.querySelector("#cep");

inputs.forEach(function (input) {
    input.addEventListener('change', function (e) {
        validate(input, e);
    });
});

inputsUpload.forEach(function (inputUpload) {
    inputUpload.addEventListener('change', function (e) {
        validate(inputUpload, e);
        uploadArquive(inputUpload, e);
    });
});

function submitForm() {
    let canSubmit = true;
    let parent;

    inputs.forEach(function (input) {
        parent = input.closest('.campo');
        if (parent.classList.contains('campo--incorreto')) {
            canSubmit = false;
            event.preventDefault();
        }
    });

    if (canSubmit && form.checkValidity()) {
        form.submit();
        event.preventDefault();
        window.location.href = "index.html";
    } else {
        event.preventDefault();
        alert('Erro! Existem cmapos vazios ou preenchidos incorretamente');
    }
}

function validate(input, event) {
    let isValid;
    const maxSize = (1024 * 1000);

    if (input.type === 'file') {
        isValid = (event.target.files.length === 1) && (input.files[0].size <= maxSize) ? true : false;
    } else {
        isValid = input.validity.valid;
    }

    toggleIncorretClass(input, !isValid);
}

function toggleIncorretClass(element, isIncorrect) {
    const parent = element.closest('.campo');
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

    if (e.target.files.length < 1) {
        p.innerHTML = 'Clique aqui para <br> selecionar o arquivo';
        return
    }

    const arqName = e.target.files[0].name;
    p.innerHTML = `Arquivo recebido! <br> ${arqName}`;
}

cep.addEventListener("blur", () => {
    if (cep.validity.valid) {
        const cepNum = cep.value.replace(/[^0-9]+/, "");

        fetch(`https://viacep.com.br/ws/${cepNum}/json/`)
            .then((response) => response.json())
            .then((data) => {
                rua.value = data.logradouro || ""
                cidade.value = data.localidade || ""
                estado.value = data.uf || ""

                toggleDisabledCamp(rua);
                toggleDisabledCamp(cidade);
                toggleDisabledCamp(estado);
            })
    }
});

export function toggleDisabledCamp(element) {
    const parent = element.closest('.campo');

    if (element.value === "") {
        parent.classList.remove('campo--desativado');
    } else {
        parent.classList.add('campo--desativado');
    }
}

buttons.forEach(function (button) {
    button.addEventListener('click', () => {
        event.preventDefault();

        if (button.classList.contains('botao--secundario')) {
            clearForm();
        } else {
            if (button.classList.contains('botao--salvar')) {
                saveForm();
            } else {
                submitForm();
            }
        }
    });
});

function clearForm(input) {

    inputs.forEach(function (input) {
        input.value = '';
        const parent = input.closest('.campo');

        parent.classList.remove('campo--incorreto', 'campo--desativado');

        const span = parent.querySelector('span');
        if (span) span.textContent = '';
    });

    inputsUpload.forEach(function (inputUpload) {
        inputUpload.value = '';
        const p = inputUpload.previousElementSibling;
        if (p) p.innerHTML = 'Clique aqui para <br> selecionar o arquivo';
    });

    trilhas.forEach(function (trilha) {
        if(trilha.checked) trilha.checked = false;
    })

    if (terms) terms.checked = false;
}