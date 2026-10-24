
const translations = {
  uk: {
   MyAccount: 'Мій акаунт',
   titleAscetic: 'Моя Аскеза',
   Description: 'Опис аскези',
   Duration: 'Тривалість',
   Result: 'Очікуваний результат',
   BeginBtn: 'Розпочати аскезу',
   RegOpen: 'Рег/Увійти',
   Main: 'Головна',
   Example: 'Приклад ',
   Sesiy: 'Мої аскези',
   language: 'UK',
   
  },
  en: {
    MyAccount: 'MyAccount',
    titleAscetic: 'My Askesis',
    Description: 'Austerity Description',
    Duration: 'Duration',
    Result: 'Expected Result',
    BeginBtn: 'Begin Austerity',
    RegOpen: 'Sign In',
    Main: 'Main',
    Example: 'Example Askesises',
    Sesiy: 'My Asceses',
    language: 'EN',
  },
};


type Language = 'uk' | 'en';

let currentLanguage: Language = 'en';

function toggleLanguage(): void {
  currentLanguage = currentLanguage === 'en' ? 'uk' : 'en';
   updateLanguage();
}

function updateLanguage(): void {
  document.querySelectorAll<HTMLElement>('[data-translate]').forEach((element) => {
    const key = element.dataset.translate as keyof typeof translations.uk;

    element.textContent = translations[currentLanguage][key];
  });
}

const languageButton = document.querySelector<HTMLElement>('#language-button');
languageButton?.addEventListener('click', () => {
   
    toggleLanguage();

    
});


