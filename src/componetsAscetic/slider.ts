import sound3 from '../assets/sound/sound-3.mp3';
const left = document.querySelector<HTMLButtonElement>('#left');
const right = document.querySelector<HTMLButtonElement>('#right');
const slider = document.querySelector<HTMLElement>('.save-ascetic');
const clickSound1 = new Audio(sound3);
clickSound1.volume = 0.5;

function scrollByCard(direction: -1 | 1): void {
  if (!slider) return;

  const card = slider.querySelector<HTMLElement>('.ascetic-card');
  if (!card) return;

  const gap = parseFloat(getComputedStyle(slider).gap) || 0;
  const step = card.getBoundingClientRect().width + gap;

  slider.scrollBy({
    left: direction * step,
    behavior: 'smooth',
  });
}

left?.addEventListener('click', () => {
  clickSound1.currentTime = 0;
   clickSound1.play();
  scrollByCard(-1)
});
right?.addEventListener('click', () => {
  clickSound1.currentTime = 0;
   clickSound1.play();
  scrollByCard(1)
});



