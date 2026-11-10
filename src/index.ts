import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.scss'
import { datePicker } from './componetsIndex/calendar';
import { asceticTemplates, templateStorageKey } from './componetsIndex/templateAscesa';
import { currentLanguage } from './componetsOur/lang';
import './componetsIndex/saveAscetic';
import './componetsIndex/auth'; 
import './componetsIndex/shodowToggle'; 
 
// Вставка шаблонов в форму и клендарь

const selectedTemplateId = sessionStorage.getItem(templateStorageKey);

if (selectedTemplateId) {
  const selectedTemplate = asceticTemplates.find(
    (template) => template.id === selectedTemplateId
  );

  const nameInput = document.querySelector<HTMLTextAreaElement>('#name');
  const resultInput = document.querySelector<HTMLTextAreaElement>('#result');

  if (selectedTemplate && nameInput && resultInput) {
    nameInput.value = currentLanguage === 'uk' ? selectedTemplate.description : currentLanguage === 'nl' ? selectedTemplate.descriptionNl : selectedTemplate.descriptionEn;
    resultInput.value = currentLanguage === 'uk' ? selectedTemplate.result : currentLanguage === 'nl' ? selectedTemplate.resultNl : selectedTemplate.resultEn;

    // Начало — завтра; длительность берётся из шаблона.
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() + 1);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + selectedTemplate.durationDays - 1);

    datePicker?.setDate([startDate, endDate], false);
  }

  sessionStorage.removeItem(templateStorageKey);
}

// Переход на политики коефедициальности

const politics = document.querySelector<HTMLTextAreaElement>('#politics');
politics?.addEventListener('click', () => {
    window.location.href = './privacy.html';
})

 