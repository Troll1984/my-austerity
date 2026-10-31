import './example.scss';
import './auth';


const main = document.querySelector<HTMLElement>('#main');
main?.addEventListener('click', () => {
  window.location.href = './index.html';
});
const infoButton = document.querySelector<HTMLElement>('#info');
const infoSection = document.querySelector<HTMLElement>('.info');
const imgBackground = document.querySelector<HTMLElement>('.img-background');

infoButton?.addEventListener('click', () => {
  if (!infoSection || !imgBackground) {
    console.log({ infoSection, imgBackground });
    return;
  }

  infoSection.style.display = 'block';
  imgBackground.style.display = 'none';
});

