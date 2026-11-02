import { asceticTemplates, templateStorageKey } from './templateAscesa';
import { currentLanguage, translations } from './lang';
 
 

const templateGrid = document.querySelector<HTMLElement>('#template-grid');

function renderTemplates(): void {
  if (!templateGrid) return;
  const t = translations[currentLanguage];
  templateGrid.innerHTML = asceticTemplates.map((template) => `
    <article class="template-card">
      <div class="image"> <img  src="${template.img}" alt="logo"></div>
      <h3>${currentLanguage === 'uk' ? template.title : currentLanguage === 'nl' ? template.titleNl : template.titleEn}</h3>
      <div class="title-icon">
        <span class="template-icon"><i class="fa-regular fa-calendar"></i></span>
        <span class="template-duration">${template.durationDays} ${t.templateDays}</span>
      </div>
      
      <p>${currentLanguage === 'uk' ? template.description : currentLanguage === 'nl' ? template.descriptionNl : template.descriptionEn}</p>  
      <hr>
      <p><strong>${t.templateGoal}</strong> ${currentLanguage === 'uk' ? template.result : currentLanguage === 'nl' ? template.resultNl : template.resultEn}</p>

      <div class="btnTemp"><button class="template-use" type="button" data-template-id="${template.id}">${t.templateChoose}</button></div>
    </article>
  `).join('');
}

if (templateGrid) {
  renderTemplates();
  window.addEventListener('languageChanged', renderTemplates);

  templateGrid.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

     const imageBlock = event.target.closest<HTMLElement>('.image');
    if (imageBlock && templateGrid.contains(imageBlock)) {
      imageBlock.classList.toggle('light');
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('.template-use');
    const templateId = button?.dataset.templateId;

    if (!templateId) return;

    sessionStorage.setItem(templateStorageKey, templateId);
    window.location.href = './index.html';
  });
}

