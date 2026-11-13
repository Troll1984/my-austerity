

const btnApp = document.querySelector<HTMLButtonElement>('.btn-app');
const btnComments = document.querySelector<HTMLButtonElement>('.btn-comments');
const temple = document.querySelector<HTMLButtonElement>('.temple');
const returned = document.querySelector<HTMLButtonElement>('.returned');

const infoBlock = document.querySelector<HTMLElement>('.info-block');
const comments = document.querySelector<HTMLElement>('.comments');
const back = document.querySelectorAll<HTMLElement>('.back');
const blockMenu = document.querySelector<HTMLElement>('.block-menu');
//Про додаток
btnApp?.addEventListener('click', () => {
    if(!infoBlock || !blockMenu) return      
    infoBlock.style.display = 'flex';
    blockMenu.style.display = 'none';
})
//Назад
back?.forEach((btn) => {
    btn.addEventListener('click', () => {
        window.location.href = './about.html'; 
    })
});
//Коменти
btnComments?.addEventListener('click', () => {
    if(!comments || !blockMenu) return;
    comments.style.display = 'block';
    blockMenu.style.display = 'none';
})
//Шаблони
temple?.addEventListener('click', () => {
    window.location.href = './example.html?showTemplates=1'; 
})
// Назад общая
returned?.addEventListener('click', () => {
    window.location.href = './index.html';
})
 
