import { asceticTemplates, templateStorageKey } from './templateAscesa';

const templateGrid = document.querySelector<HTMLElement>('#template-grid');

if (templateGrid) {
  templateGrid.innerHTML = asceticTemplates.map((template) => `
    <article class="template-card">
      <span class="template-icon">${template.icon}</span>
      <span class="template-duration">${template.durationDays} днів</span>
      <h3>${template.title}</h3>
      <p>${template.description}</p>
      <p><strong>Мета:</strong> ${template.result}</p>
      <button class="template-use" type="button" data-template-id="${template.id}">Обрати</button>
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

