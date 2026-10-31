import '@fortawesome/fontawesome-free/css/all.min.css';
import './example.scss';
import './auth';
import './components/exampleCards';


const main = document.querySelector<HTMLElement>('#main');
main?.addEventListener('click', () => {
  window.location.href = './index.html';
});


