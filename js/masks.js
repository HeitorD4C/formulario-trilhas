import { autoFillForm } from "./localStorage.js";
import { toggleDisabledCamp } from "./form.js";

$(document).ready(function () {
    $('#data-de-nascimento').mask('00/00/0000');
    $('#cpf').mask('000.000.000-00', { reverse: false });
    $('#telefone').mask('(00) 00000-0000');
    $('#cep').mask('00000-000');

    autoFillForm();
    toggleDisabledCamp(rua);
    toggleDisabledCamp(cidade);
    toggleDisabledCamp(estado);
});
