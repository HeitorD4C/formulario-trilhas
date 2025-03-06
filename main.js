//Máscaras dos dados
$('#data-de-nascimento').mask('00/00/0000');
$('#cpf').mask('000.000.000-00', {reverse: true});
$('#telefone').mask('(00) 00000-0000');
$('#cep').mask('00000-000');

function toggleIncorretClass(element, boolean){
    const parent = element.parentElement;
    const span = parent.querySelector('span');

    if(boolean){
        if(!parent.classList.contains('campo--incorreto')){
            span.textContent = 'Preencha o campo corretamente';
            parent.classList.add('campo--incorreto');
        }
    }else{
        if(parent.classList.contains('campo--incorreto')){
            span.textContent = '';
            parent.classList.remove('campo--incorreto');
        }
    }
}

function validateInputs(){
    
    //Nome
    const name = document.getElementById('nome');
    
    if(date.value.length === 0){
        toggleIncorretClass(date, true);
    }else{
        toggleIncorretClass(date, false);
    }

    //Data
    const date = document.getElementById('data-de-nascimento');
    
    if(date.value.length != 10){
        toggleIncorretClass(date, true);
    }else{
        toggleIncorretClass(date, false);
    }

    //cpf
    const cpf = document.getElementById('cpf');
    
    if(date.value.length != 14){
        toggleIncorretClass(date, true);
    }else{
        toggleIncorretClass(date, false);
    }

    //Sexo
    const sex = document.getElementsByName('sexo');


}