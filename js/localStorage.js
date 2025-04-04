const inputs = document.querySelectorAll('.campo__input');
const selects = document.querySelectorAll('.campo__select');
const trilhas = document.querySelectorAll('.campo-botoes__input');
const terms = document.getElementById('aceitar-termos');

export function saveForm() {

    inputs.forEach(element => {
        localStorage.setItem(`${element.getAttribute('name')}`, `${element.value}`);
    });

    selects.forEach(element => {
        localStorage.setItem(`${element.getAttribute('name')}`, `${element.value}`);
    });

    trilhas.forEach(element => {
        if (element.checked) {
            localStorage.setItem('trilha', `${element.getAttribute('id')}`);
        }
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
        if(element.getAttribute('id') === localStorage.getItem('trilha')){
            element.checked = true;
        }
    })

    terms.checked = localStorage.getItem('termos') === 'true';
}