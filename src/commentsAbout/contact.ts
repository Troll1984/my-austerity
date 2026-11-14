const contact = document.querySelector<HTMLElement>('.contact');
const btnContact = document.querySelector<HTMLButtonElement>('.btn-contact');
const blockMenu = document.querySelector<HTMLElement>('.block-menu');
btnContact?.addEventListener('click', () => {
    if(!contact || !blockMenu) return;
    contact.style.display = 'flex';
    blockMenu.style.display = 'none';
})