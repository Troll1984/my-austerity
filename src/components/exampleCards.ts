const template = document.querySelector<HTMLElement>('#template');
const sectionOne = document.querySelector<HTMLElement>('.section-one');
const cardAscetic = document.querySelector<HTMLElement>('.card-ascetic');
const header = document.querySelector<HTMLElement>('.header');
const btnClose = document.querySelector<HTMLElement>('.btn');
const btnClose1 = document.querySelector<HTMLElement>('.btn1');
const img = document.querySelector<HTMLElement>('#img');
const logo = document.querySelector<HTMLElement>('.logo');
const logo1 = document.querySelector<HTMLElement>('.logo1');
const infoButton = document.querySelector<HTMLElement>('#info');
const infoSection = document.querySelector<HTMLElement>('.info');
const imgBackground = document.querySelector<HTMLElement>('.img-background');
 



infoButton?.addEventListener('click', () => {
  if (!infoSection || !imgBackground || !btnClose1 || !sectionOne || !cardAscetic || !logo1) {
    console.log({ infoSection, imgBackground });
    return;
  }
  sectionOne.style.display = 'block';
  cardAscetic.style.display = 'none';
  infoSection.style.display = 'block';
  imgBackground.style.display = 'none';
  btnClose1.style.display = 'block';
  logo1.style.display = 'none';
});

template?.addEventListener('click', () => {
    if(!template || !sectionOne || !cardAscetic || !header || !btnClose || !logo1 ) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'block';
    header.style.display = 'none';
    btnClose.style.display = 'block';
    logo1.style.display = 'flex';
   
    
});
btnClose?.addEventListener('click', () => {
    if(!template || !sectionOne || !cardAscetic || !header || !img || !logo || !logo1) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'none';
    header.style.display = 'flex';
    img.style.display = 'block';
    logo.style.display = 'flex';
    logo1.style.display = 'none';
})
btnClose1?.addEventListener('click', () => {
    if(!template || !sectionOne || !cardAscetic || !header || !img || !logo  || !imgBackground || !logo1) return;
    sectionOne.style.display = 'none';
    cardAscetic.style.display = 'none';
    header.style.display = 'flex';
    imgBackground.style.display = 'block';
    logo.style.display = 'flex';
    img.style.display = 'block';
    logo1.style.display = 'none';
})

