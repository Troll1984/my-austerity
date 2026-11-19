
import sound4 from '../assets/sound/sound-4.mp3';
const btnApp = document.querySelector<HTMLButtonElement>('.btn-app');
const btnComments = document.querySelector<HTMLButtonElement>('.btn-comments');
const temple = document.querySelector<HTMLButtonElement>('.temple');
const returned = document.querySelector<HTMLButtonElement>('.returned');
const infoBlock = document.querySelector<HTMLElement>('.info-block');
const comments = document.querySelector<HTMLElement>('.comments');
const back = document.querySelectorAll<HTMLElement>('.back');
const blockMenu = document.querySelector<HTMLElement>('.block-menu');
const Subscrip = document.querySelector<HTMLElement>('.Subscrip');
const btnSupport = document.querySelector<HTMLButtonElement>('.btn-support');
const donatBlock = document.querySelector<HTMLElement>('.donat-block');

btnSupport?.addEventListener('click', () => {
     if(!donatBlock) return;  
    donatBlock.style.display = 'flex';
})

Subscrip?.addEventListener('click', () => {
    alert('Цей розділ перебуває в розробці.');
})
//Про додаток
btnApp?.addEventListener('click', () => {
    if(!infoBlock || !blockMenu) return      
    infoBlock.style.display = 'flex';
    blockMenu.style.display = 'none';
})
//Назад
const backSound = new Audio(sound4);
backSound.volume = 0.9;

back?.forEach((btn) => {
    btn.addEventListener('click', () => {
        backSound.currentTime = 0;
        backSound.play().then(() => {
            backSound.onended = () => {
                window.location.href = './about.html';
            };
        }).catch(() => {
            window.location.href = './about.html';
        });
    });
});
//Коменти
btnComments?.addEventListener('click', () => {
    if(!comments || !blockMenu) return;
    comments.style.display = 'block';
    blockMenu.style.display = 'none';
})
//Шаблони
temple?.addEventListener('click', () => {
      window.location.href = './example.html?from=buttons&showTemplates=1';
})
// Назад общая
returned?.addEventListener('click', () => {
    backSound.currentTime = 0;

    backSound.onended = () => {
        window.location.href = './index.html';
    };

    backSound.play().catch(() => {
        window.location.href = './index.html';
    });
});

const savetemple = document.querySelector<HTMLElement>('.savetemple');

savetemple?.addEventListener('click', () => {
    window.location.href = './ascetic.html?from=buttons';
});
 
