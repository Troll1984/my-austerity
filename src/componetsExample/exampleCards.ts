const template = document.querySelector<HTMLElement>('#template');
const sectionOne = document.querySelector<HTMLElement>('.section-one');
const cardAscetic = document.querySelector<HTMLElement>('.card-ascetic');
const header = document.querySelector<HTMLElement>('.header');
const btnClose = document.querySelector<HTMLElement>('.btn');
const btnClose1 = document.querySelector<HTMLElement>('.btn1');
const img = document.querySelector<HTMLElement>('#img');

const infoButton = document.querySelector<HTMLElement>('#info');
const infoSection = document.querySelector<HTMLElement>('.info');
const imgBackground = document.querySelector<HTMLElement>('.img-background');
 



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
    if(!template || !sectionOne || !cardAscetic || !header || !img ) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'none';
    header.style.display = 'flex';
    img.style.display = 'block';
   
})
btnClose1?.addEventListener('click', () => {
    if(!template || !sectionOne || !cardAscetic || !header || !img || !imgBackground ) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'none';
    header.style.display = 'flex';
    imgBackground.style.display = 'block';
  
    img.style.display = 'block';
   
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
