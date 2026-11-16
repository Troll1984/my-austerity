import sound4 from '../assets/sound/sound-4.mp3';
const template = document.querySelector<HTMLElement>('#template');
const sectionOne = document.querySelector<HTMLElement>('.section-one');
const cardAscetic = document.querySelector<HTMLElement>('.card-ascetic');
const header = document.querySelector<HTMLElement>('.header');
const btnClose = document.querySelector<HTMLElement>('.btn');
const btnClose1 = document.querySelector<HTMLElement>('.btn1');


const infoButton = document.querySelector<HTMLElement>('#info');
const infoSection = document.querySelector<HTMLElement>('.info');
const imgBackground = document.querySelector<HTMLElement>('.img-background');
const backSound = new Audio(sound4);
 backSound.volume = 0.9;
 



infoButton?.addEventListener('click', () => {
  if (!infoSection || !imgBackground || !btnClose1 || !sectionOne || !cardAscetic ) {
    console.log({ infoSection, imgBackground });
    return;
  }
  sectionOne.style.display = 'block';
  cardAscetic.style.display = 'none';
  infoSection.style.display = 'block';
  imgBackground.style.display = 'none';
  btnClose1.style.display = 'block';
 
});

template?.addEventListener('click', () => {
    if(!template || !sectionOne || !cardAscetic || !header || !btnClose ) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'block';
    header.style.display = 'none';
    btnClose.style.display = 'block';
   
   
    
});

if (new URLSearchParams(window.location.search).has('showTemplates')) {
  template?.click();
}

btnClose?.addEventListener('click', () => {
    backSound.currentTime = 0;

    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    backSound.onended = () => {
        if (from === 'buttons') {
            window.location.href = './about.html';
        } else {
           window.location.href = './example.html';
        }
    };

    backSound.play().catch(() => {
        if (from === 'buttons') {
            window.location.href = './about.html';
        } else {
            window.location.href = './example.html';
        }
    });
});
btnClose1?.addEventListener('click', () => {
    backSound.currentTime = 0;
    backSound.play();
    if(!template || !sectionOne || !cardAscetic || !header || !imgBackground ) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'none';
    header.style.display = 'flex';
    imgBackground.style.display = 'block';         
})


// Отправляет шаблоны в форму при нажатии на кнопки
document.querySelectorAll<HTMLButtonElement>('.template-use').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCard = button.closest<HTMLElement>('.template-card');
    if (!selectedCard) return;

    document.querySelectorAll('.template-card').forEach((card) => {
      card.classList.remove('selected');
      card.querySelector('.template-use')!.textContent = 'Обрати';
    });   
  });
});
