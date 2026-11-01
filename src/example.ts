import '@fortawesome/fontawesome-free/css/all.min.css';
import './example.scss';
import './auth';
import './components/exampleCards';
import './components/exempleSaveCards';
import './components/sliderExample';





const main = document.querySelector<HTMLElement>('#main');
main?.addEventListener('click', () => {
  window.location.href = './index.html';
});


