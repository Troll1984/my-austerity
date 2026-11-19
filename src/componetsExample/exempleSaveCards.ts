import { asceticTemplates } from '../componetsIndex/templateAscesa';
import { currentLanguage, translations } from '../componetsOur/lang';
import { supabase } from '../supabase';
import { templateSections } from './templateSections';

const selectedDurations = new Map<string, number>();
const durationOptions = [7, 14, 21, 30, 90];
const selectedTitler = new Map<string, string>();
 

const templateGrid = document.querySelector<HTMLElement>('#template-grid');

function renderTemplates(): void {
  if (!templateGrid) return;
  const t = translations[currentLanguage];
  const localizedTitle = (template: typeof asceticTemplates[number]) =>
    currentLanguage === 'uk' ? template.title : currentLanguage === 'nl' ? template.titleNl : template.titleEn;
  templateGrid.innerHTML = templateSections.map((section) => {
    const template = asceticTemplates.find(item => item.id === section.id);
    if (!template) return '';
    const sectionOptions = section.optionIds
      .map(id => asceticTemplates.find(item => item.id === id))
      .filter((item): item is typeof asceticTemplates[number] => Boolean(item));
    const selectedTitleId = selectedTitler.get(section.id) ?? section.id;
    const selectedTitleTemplate = sectionOptions.find(item => item.id === selectedTitleId) ?? template;
    return `
    <article class="template-card">
      <div class="image"> <img src="${section.image}" alt="${localizedTitle(template)}"></div>


      <button class="titler" type="button" data-btn-id="${template.id}">
      
      <h3>${localizedTitle(selectedTitleTemplate)}</h3>
      </button>
      <div class="duration-titler" data-titler-id="${template.id}" hidden>
        ${sectionOptions.map(titleTemplate => `
         <button
          type="button"
          class="titler-option ${selectedTitleTemplate.id === titleTemplate.id ? 'active' : ''}"
          data-title-template-id="${titleTemplate.id}"
          data-template-id="${template.id}">
          ${localizedTitle(titleTemplate)}
        </button>
       
        `).join('')}
      </div>



     <div class="title-icon">
        <button class="template-calendar" type="button" data-template-id="${template.id}">
          <i class="fa-regular fa-calendar"></i>
        </button>

        <span class="template-duration">
             ${selectedDurations.get(template.id) ?? selectedTitleTemplate.durationDays} ${t.templateDays}
        </span>
    </div>

      <div class="duration-popup" data-popup-id="${template.id}" hidden>
        ${durationOptions.map(days => `
         <button
          type="button"
          class="duration-option ${(selectedDurations.get(template.id) ?? template.durationDays) === days ? 'active' : ''}"
          data-days="${days}"
          data-template-id="${template.id}">
          ${days}
        </button>
        `).join('')}
      </div>
      
      <p class="template-description">${currentLanguage === 'uk' ? selectedTitleTemplate.description : currentLanguage === 'nl' ? selectedTitleTemplate.descriptionNl : selectedTitleTemplate.descriptionEn}</p>  
      <hr>
      <p><strong>${t.templateGoal}</strong> <span class="template-result">${currentLanguage === 'uk' ? selectedTitleTemplate.result : currentLanguage === 'nl' ? selectedTitleTemplate.resultNl : selectedTitleTemplate.resultEn}</span></p>

      <div class="btnTemp"><button class="template-use" type="button" data-template-id="${template.id}">${t.templateChoose}</button></div>
    </article>
  `;
  }).join('');
}

if (templateGrid) {
  renderTemplates();
  window.addEventListener('languageChanged', renderTemplates);

  templateGrid.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;

    const titleButton = event.target.closest<HTMLButtonElement>('.titler');
    if (titleButton) {
      const templateId = titleButton.dataset.btnId;
      const popup = templateGrid.querySelector<HTMLElement>(`.duration-titler[data-titler-id="${templateId}"]`);
      if (popup) popup.hidden = !popup.hidden;
      return;
    }

    const titleOption = event.target.closest<HTMLButtonElement>('.titler-option');
    if (titleOption) {
      const templateId = titleOption.dataset.templateId;
      const titleTemplateId = titleOption.dataset.titleTemplateId;
      if (!templateId || !titleTemplateId) return;
      selectedTitler.set(templateId, titleTemplateId);
      selectedDurations.delete(templateId);
      const card = titleOption.closest('.template-card');
      const titleTemplate = asceticTemplates.find(item => item.id === titleTemplateId);
      const heading = card?.querySelector('.titler h3');
      if (heading && titleTemplate) {
        heading.textContent = currentLanguage === 'uk' ? titleTemplate.title
          : currentLanguage === 'nl' ? titleTemplate.titleNl : titleTemplate.titleEn;
      }
      const description = card?.querySelector<HTMLElement>('.template-description');
      const result = card?.querySelector<HTMLElement>('.template-result');
      if (titleTemplate && description) {
        description.textContent = currentLanguage === 'uk' ? titleTemplate.description
          : currentLanguage === 'nl' ? titleTemplate.descriptionNl : titleTemplate.descriptionEn;
      }
      if (titleTemplate && result) {
        result.textContent = currentLanguage === 'uk' ? titleTemplate.result
          : currentLanguage === 'nl' ? titleTemplate.resultNl : titleTemplate.resultEn;
      }
      const durationLabel = card?.querySelector<HTMLElement>('.template-duration');
      if (durationLabel && titleTemplate) {
        durationLabel.textContent = `${titleTemplate.durationDays} ${translations[currentLanguage].templateDays}`;
      }
      card?.querySelectorAll<HTMLButtonElement>('.duration-option').forEach(option => {
        option.classList.toggle('active', Number(option.dataset.days) === titleTemplate?.durationDays);
      });
      card?.querySelectorAll('.titler-option').forEach(option => {
        option.classList.toggle('active', (option as HTMLButtonElement).dataset.titleTemplateId === titleTemplateId);
      });
      card?.querySelector<HTMLElement>('.duration-titler')?.setAttribute('hidden', '');
      return;
    }

    // Открытие и закрытие выбора периода
const calendar = event.target.closest<HTMLButtonElement>('.template-calendar');

if (calendar) {
  const templateId = calendar.dataset.templateId;
  const popup = templateGrid.querySelector<HTMLElement>(
    `.duration-popup[data-popup-id="${templateId}"]`
  );

  if (popup) {
    popup.hidden = !popup.hidden;
  }

  return;
}

// Выбор продолжительности
const durationButton = event.target.closest<HTMLButtonElement>('.duration-option');

if (durationButton) {
  const templateId = durationButton.dataset.templateId;
  const days = Number(durationButton.dataset.days);

  if (!templateId || !durationOptions.includes(days)) return;

  selectedDurations.set(templateId, days);

  const card = durationButton.closest('.template-card');
  const durationLabel = card?.querySelector('.template-duration');
  const popup = card?.querySelector('.duration-popup');

  if (durationLabel) {
    durationLabel.textContent = `${days} ${translations[currentLanguage].templateDays}`;
  }

  popup?.querySelectorAll('.duration-option').forEach(option => {
    option.classList.toggle(
      'active',
      Number((option as HTMLButtonElement).dataset.days) === days
    );
  });

  popup?.setAttribute('hidden', '');

  return;
}

     const imageBlock = event.target.closest<HTMLElement>('.image');
    if (imageBlock && templateGrid.contains(imageBlock)) {
      imageBlock.classList.toggle('light');
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('.template-use');
    const templateId = button?.dataset.templateId;

    if (!templateId) return;
    const selectedTemplateId = selectedTitler.get(templateId) ?? templateId;
    const selectedTemplate = asceticTemplates.find((template) => template.id === selectedTemplateId);
    if (!selectedTemplate || !button) return;

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = currentLanguage === 'uk' ? 'Створюємо…' : currentLanguage === 'nl' ? 'Aanmaken…' : 'Creating…';

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        alert(currentLanguage === 'uk'
          ? 'Увійдіть в акаунт, щоб створити аскезу.'
          : currentLanguage === 'nl'
            ? 'Log in om een askesis aan te maken.'
            : 'Sign in to create an austerity.');
        return;
      }

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() + 1);
     const duration = selectedDurations.get(templateId) ?? selectedTemplate.durationDays;
      const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration - 1);
      const formatDate = (date: Date) =>
        `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

      const name = currentLanguage === 'uk' ? selectedTemplate.title
        : currentLanguage === 'nl' ? selectedTemplate.titleNl
          : selectedTemplate.titleEn;
      const result = currentLanguage === 'uk' ? selectedTemplate.result
        : currentLanguage === 'nl' ? selectedTemplate.resultNl
          : selectedTemplate.resultEn;

     // Шифруем данные выбранного шаблона
const { data: encryptionData, error: encryptionError } =
  await supabase.functions.invoke('smooth-worker', {
    body: {
      action: 'encrypt',
      data: {
        name,
        duration: `${formatDate(startDate)} to ${formatDate(endDate)}`,
        expected_result: result,
        completed_days: [],
        status: 'active'
      }
    }
  });

if (encryptionError) throw encryptionError;

// Сохраняем зашифрованные данные
const { error: insertError } = await supabase
  .from('ascetics')
  .insert({
    user_id: userData.user.id,
    encrypted_data: encryptionData.encrypted_data,
    encryption_version: 1
  });

if (insertError) throw insertError;
      window.location.href = './ascetic.html';
    } catch (error) {
      console.error('Failed to create austerity from template:', error);
      alert(currentLanguage === 'uk'
        ? 'Не вдалося створити аскезу. Спробуйте ще раз.'
        : currentLanguage === 'nl'
          ? 'Askesis aanmaken is mislukt. Probeer het opnieuw.'
          : 'Could not create the austerity. Please try again.');
    } finally {
      if (button.isConnected) {
        button.disabled = false;
        button.textContent = originalText ?? translations[currentLanguage].templateChoose;
      }
    }
  });
}

