import { saveForm } from "./localStorage.js";

// ========== Elemetos do Domínio ========== //

const dom = {
    form: document.querySelector('form'),
    inputs: document.querySelectorAll('.campo__input'),
    fileInputs: document.querySelectorAll('.campo__input--file'),
    buttons: document.querySelectorAll('.botao'),
    terms: document.querySelector('#aceitar-termos'),
    trilhas: document.querySelectorAll('.campo-botoes__input'),
};
const address = {
    rua: document.querySelector("#rua"),
    cidade: document.querySelector("#cidade"),
    estado: document.querySelector("#estado"),
    cep: document.querySelector("#cep")
}

// ========== Event Listeners ========== //

dom.inputs.forEach(function (input) {
    input.addEventListener('change', function (e) {
        validate(input, e);
    });
});

dom.fileInputs.forEach(function (fileInput) {
    fileInput.addEventListener('change', function (e) {
        validate(fileInput, e);
        uploadArquive(fileInput, e);
    });
});

dom.buttons.forEach(function (button) {
    button.addEventListener('click', () => {
        event.preventDefault();

        if (button.classList.contains('botao--secundario')) {
            clear();
        } else {
            if (button.classList.contains('botao--salvar')) {
                saveForm(true);
            } else {
                saveForm(false);
                submitForm();

            }
        }
    });
});

address.cep.addEventListener("blur", () => {
    if (address.cep.validity.valid) {
        const cepNum = address.cep.value.replace(/[^0-9]+/, "");

        fetch(`https://viacep.com.br/ws/${cepNum}/json/`)
            .then((response) => response.json())
            .then((data) => {
                address.rua.value = data.logradouro || ""
                address.cidade.value = data.localidade || ""
                address.estado.value = data.uf || ""

                toggleDisabledCamp(address.rua);
                toggleDisabledCamp(address.cidade);
                toggleDisabledCamp(address.estado);
            })
    }
});

// ========== Funçoes ========== //

function submitForm() {
    let canSubmit = true;
    event.preventDefault();

    dom.inputs.forEach(function (input) {
        const parent = input.closest('.campo');
        if (parent.classList.contains('campo--incorreto')) {
            canSubmit = false;
        }
    });

    if (canSubmit && dom.form.checkValidity()) {
        if (!localStorage.getItem('statusForm')) {
            localStorage.setItem('statusForm', `true`);
        }

        dom.form.submit();
        window.location.href = "index.html";
    } else {
        alert('Erro! Existem cmapos vazios ou preenchidos incorretamente');
    }
}

function clear() {

    dom.inputs.forEach(function (input) {
        input.value = '';
        const parent = input.closest('.campo');

        parent.classList.remove('campo--incorreto', 'campo--desativado');

        const span = parent.querySelector('span');
        if (span) span.textContent = '';
    });

    dom.fileInputs.forEach(function (fileInput) {
        fileInput.value = '';
        const p = fileInput.previousElementSibling;
        if (p) p.innerHTML = 'Clique aqui para <br> selecionar o arquivo';
    });

    dom.trilhas.forEach(function (trilha) {
        if (trilha.checked) trilha.checked = false;
    })

    if (dom.terms) dom.terms.checked = false;
}


function validate(input, event) {
    let isValid = true;

    if (input.type === 'file') {
        const maxSize = (1024 * 1000);
        isValid = (event.target.files.length === 1) && (input.files[0].size <= maxSize) ? true : false;
    } else {
        if (input.getAttribute('id') === 'email') {
            const emailRegex = /[a-z!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z](?:[a-z-]*[a-z])?\.)+[a-z](?:[a-z-]*[a-z])?/gi;
            isValid = emailRegex.test(input.value) ? true : false;
        } else {
            isValid = input.validity.valid;
        }
    }

    errorClass(input, isValid);
}

function errorClass(element, isValid) {
    const parent = element.closest('.campo');
    const span = parent.querySelector('span');

    if (!isValid) {
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
    p.innerHTML = `Arquivo carregado! <br> ${arqName}`;
}

export function toggleDisabledCamp(element) {
    const parent = element.closest('.campo');

    if (element.value === "") {
        parent.classList.remove('campo--desativado');
    } else {
        parent.classList.add('campo--desativado');
    }
}