import '@fortawesome/fontawesome-free/css/all.min.css';
import './privacy.scss';
import './componetsOur/aboutLanguage';

console.log('hello');

const politic = document.querySelector<HTMLElement>('.politic');
const condit = document.querySelector<HTMLElement>('.condit');
const buttonArrowRight = document.querySelector<HTMLButtonElement>('.button-arrow-right');
const buttonArrowLeft = document.querySelector<HTMLButtonElement>('.button-arrow-left');
const back = document.querySelector<HTMLButtonElement>('.back');
buttonArrowRight?.addEventListener('click', () => {
    condit?.classList.add('slide');
    politic?.classList.add('slide');
})
buttonArrowLeft?.addEventListener('click', () => {
    condit?.classList.remove('slide');
    politic?.classList.remove('slide');
})
back?.addEventListener('click', () => {
     window.location.href = './index.html';
    
})


document.documentElement.classList.add('no-animation');

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-animation');
    });
});

