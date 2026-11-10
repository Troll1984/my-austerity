const left = document.querySelector<HTMLButtonElement>('#left');
const right = document.querySelector<HTMLButtonElement>('#right');
const slider = document.querySelector<HTMLElement>('.save-ascetic');

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

left?.addEventListener('click', () => scrollByCard(-1));
right?.addEventListener('click', () => scrollByCard(1));



