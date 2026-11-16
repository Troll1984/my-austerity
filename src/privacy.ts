import sound4 from './assets/sound/sound-4.mp3';
import sound2 from './assets/sound/sound-2.mp3';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './privacy.scss';
import './componetsOur/aboutLanguage';

console.log('hello');
const clickSound = new Audio(sound2);
const backSound = new Audio(sound4);
clickSound.volume = 0.5;
backSound.volume = 0.9; 
const politic = document.querySelector<HTMLElement>('.politic');
const condit = document.querySelector<HTMLElement>('.condit');
const buttonArrowRight = document.querySelector<HTMLButtonElement>('.button-arrow-right');
const buttonArrowLeft = document.querySelector<HTMLButtonElement>('.button-arrow-left');
const back = document.querySelector<HTMLButtonElement>('.back');
buttonArrowRight?.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    condit?.classList.add('slide');
    politic?.classList.add('slide');
})
buttonArrowLeft?.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    condit?.classList.remove('slide');
    politic?.classList.remove('slide');})
back?.addEventListener('click', () => {  
    backSound.currentTime = 0;
    backSound.play();
     backSound.onended = () => {
        window.location.href = './index.html';
    };    
});


document.documentElement.classList.add('no-animation');

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-animation');
    });
});

