import { asceticTemplates } from './templateAscesa';
import { currentLanguage, translations } from './lang';
import { supabase } from '../supabase';
 
 

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

  templateGrid.addEventListener('click', async (event) => {
    if (!(event.target instanceof Element)) return;

     const imageBlock = event.target.closest<HTMLElement>('.image');
    if (imageBlock && templateGrid.contains(imageBlock)) {
      imageBlock.classList.toggle('light');
      return;
    }

    const button = event.target.closest<HTMLButtonElement>('.template-use');
    const templateId = button?.dataset.templateId;

    if (!templateId) return;
    const selectedTemplate = asceticTemplates.find((template) => template.id === templateId);
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
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + selectedTemplate.durationDays - 1);
      const formatDate = (date: Date) =>
        `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

      const name = currentLanguage === 'uk' ? selectedTemplate.description
        : currentLanguage === 'nl' ? selectedTemplate.descriptionNl
          : selectedTemplate.descriptionEn;
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

