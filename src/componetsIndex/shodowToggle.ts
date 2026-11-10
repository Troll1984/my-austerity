//Выключатель света
 const light = document.querySelector<HTMLImageElement>('#img');
 const boxShadowToggle = () => {
  light?.classList.toggle('light-toggle');
}

light?.addEventListener('click', boxShadowToggle);



  