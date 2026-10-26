import './example.scss';
import './auth';


const main = document.querySelector<HTMLElement>('#main');
main?.addEventListener('click', () => {
  window.location.href = './index.html';
})