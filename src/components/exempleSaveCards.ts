import { asceticTemplates, templateStorageKey } from './templateAscesa';

const templateGrid = document.querySelector<HTMLElement>('#template-grid');

if (templateGrid) {
  templateGrid.innerHTML = asceticTemplates.map((template) => `
    <article class="template-card">
      <div class="image"> <img src="${template.img}" alt="logo"></div>
      <h3>${template.title}</h3>
      <div class="title-icon">
        <span class="template-icon"><i class="fa-regular fa-calendar"></i></span>
        <span class="template-duration">${template.durationDays} днів</span>
      </div>
      
      <p>${template.description}</p>  
      <hr>
      <p><strong>Мета:</strong> ${template.result}</p>

      <div class="btnTemp"><button class="template-use" type="button" data-template-id="${template.id}">Обрати</button></div>
    </article>
  `).join('');

  templateGrid.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>('.template-use');
    const templateId = button?.dataset.templateId;

    if (!templateId) return;

    sessionStorage.setItem(templateStorageKey, templateId);
    window.location.href = './index.html';
  });
}

