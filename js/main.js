document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('statusForm') === 'true'){
        changeActivity(0, 'Formulário concluído', 'Ver')
    }
});

function changeActivity(index, textTitle, textButton) {
    const activitys = document.querySelectorAll('.atividades__atividade');
    const activity = activitys[index];

    const title = activity.querySelector('.campo--titulo');
    const button = activity.querySelector('.botao');
    
    title.textContent = textTitle;
    button.textContent = textButton;
}