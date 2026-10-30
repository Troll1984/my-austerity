const left = document.querySelector<HTMLButtonElement>('#left');
const right = document.querySelector<HTMLButtonElement>('#right');
 
const saveAscetic = document.querySelector<HTMLElement>('.save-ascetic');
const wrapper = document.querySelector<HTMLElement>('.slider-wrapper');

let move = 0;
const step = 410;

right?.addEventListener('click', () => {

    if (!saveAscetic || !wrapper) return;

    const maxMove = saveAscetic.scrollWidth - wrapper.clientWidth;
    move = Math.min(move + step, maxMove);

    saveAscetic.style.transform = `translateX(-${move}px)`;

});

left?.addEventListener('click', () => {

    if (!saveAscetic) return;

    move = Math.max(move - step, 0);

    saveAscetic.style.transform = `translateX(-${move}px)`;

});




