
export const translations = {
  uk: {
   aboutApp: 'Про додаток',
   politics: 'Політика та правила',
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
   Sesiy1: 'Шаблони',
   info: 'Про аскезу',
   language: 'UK',
   titleAuth: 'Моя Аскеза',
   messAuth: 'Увійдіть у свій акаунт або створіть новий. на англ',
   emailAuth: 'Електронна пошта',
   passAuth:'Пароль',
   btnAuth: 'Увійти',
   signUpTitle: 'Створіть акаунт',
   signUpSubtitle: 'Зареєструйтеся, щоб зберігати свої аскези',
   signUpButton: 'Зареєструватися',
   signUpToggle: 'Немає акаунта? Зареєструватися',
   signInTitle: 'Моя Аскеза',
   signInSubtitle: 'Увійдіть у свій акаунт',
   signInButton: 'Увійти',
   signInToggle: 'Вже є акаунт? Увійти',  
   gotName: 'Опис Аскези',
   duren: 'Тривалість Аскези',
   gotRes: 'Очікуваний результат',
   progressTitle: 'Прогрес',   
   btnLang: 'UK',  
   calendarTitle: 'Позначайте виконані дні',
   deleteButton: 'Видалити',
   statusFailed: '❌ Аскезу не виконано.',
   statusCompleted: '✅ Аскезу виконано.',
   statusPlanned: '⏳ Аскеза ще не розпочалася',
   statusActive: '🟢 Аскеза триває.',  
   templateHeading: 'Оберіть шаблон аскези',
   saveAusterity: 'Збережені аскези',
   templateDays: 'днів', templateGoal: 'Мета:', templateChoose: 'Обрати',
  },
  en: {
    aboutApp: 'About App',
    politics: 'Privacy & Terms',
    MyAccount: 'MyAccount',
    titleAscetic: 'My Austerity',
    Description: 'Austerity Description',
    Duration: 'Duration',
    Result: 'Expected Result',
    BeginBtn: 'Begin Austerity',
    RegOpen: 'Sign In',
    Main: 'Main',
    Example: 'Example ',
    Sesiy: 'My Austerity',
    Sesiy1: 'Template ',
    info: 'About ',
    language: 'EN',
    titleAuth: 'My Austerity',
    messAuth: 'Log in to your account or create a new one',
    emailAuth: 'Email',
    passAuth: 'Password',
    btnAuth:  'Sign In',
    signUpTitle: 'Create an account',
    signUpSubtitle: 'Sign up to save your austerities',
    signUpButton: 'Sign up',
    signUpToggle: "Don't have an account? Sign up",
    signInTitle: 'My Askesis',
    signInSubtitle: 'Log in to your account',
    signInButton: 'Sign in',
    signInToggle: "Already have an account? Sign in",
    gotName: 'Austerity Description',
    duren: 'Austerity Duration',
    gotRes: 'Expected Result',
    progressTitle: 'Progress',    
    btnLang: 'EN',
    calendarTitle: 'Mark your days',
    deleteButton: 'Delete',
    statusFailed: '❌ Austerity not completed.',
    statusCompleted: '✅ Austerity completed.',
    statusPlanned: '⏳ The austerity has not started yet',
    statusActive: '🟢 Austerity in progress.'   
    ,templateHeading: 'Choose an austerity template',
    saveAusterity: 'Saved Austerities',
    templateDays: 'days', templateGoal: 'Goal:', templateChoose: 'Choose',
  },
  nl: {
   aboutApp: 'Over de app',  politics: 'Privacy & Regels', MyAccount:  'Mijn account', titleAscetic: 'Mijn Askesis', Description: 'Beschrijving', Duration: 'Duur', Result: 'Verwacht resultaat', BeginBtn: 'Begin met askesis', RegOpen: 'Inloggen', Main: 'Home', Example: 'Voorbeeld', Sesiy: 'Mijn askesis', Sesiy1: 'Sjablonen', info: 'Over askesis', language: 'NL', titleAuth: 'Mijn Askesis', messAuth: 'Log in op je account of maak een nieuw account aan', emailAuth: 'E-mail', passAuth: 'Wachtwoord', btnAuth: 'Inloggen', signUpTitle: 'Account aanmaken', signUpSubtitle: 'Registreer om je askesis op te slaan', signUpButton: 'Registreren', signUpToggle: 'Nog geen account? Registreren', signInTitle: 'Mijn Askesis', signInSubtitle: 'Log in op je account', signInButton: 'Inloggen', signInToggle: 'Al een account? Inloggen', gotName: 'Beschrijving van askesis', duren: 'Duur van askesis', gotRes: 'Verwacht resultaat', progressTitle: 'Voortgang', btnLang: 'NL', calendarTitle: 'Markeer voltooide dagen', deleteButton: 'Verwijderen', statusFailed: '❌ Askesis niet voltooid.', statusCompleted: '✅ Askesis voltooid.', statusPlanned: '⏳ Askesis is nog niet begonnen', statusActive: '🟢 Askesis is bezig.', templateHeading: 'Kies een askesis-sjabloon', saveAusterity: 'Opgeslagen askesis', templateDays: 'dagen', templateGoal: 'Doel:', templateChoose: 'Kiezen',
  },
};
   
type Language = 'uk' | 'en' | 'nl';
const savedLanguage = sessionStorage.getItem('language');

export let currentLanguage: Language = savedLanguage === 'uk' || savedLanguage === 'nl' ? savedLanguage : 'en';

export function toggleLanguage(): void { 
  currentLanguage = currentLanguage === 'uk' ? 'en' : currentLanguage === 'en' ? 'nl' : 'uk'; sessionStorage.setItem('language', currentLanguage); 
  updateLanguage(); 
} 

export function updateLanguage(): void { 
  document.querySelectorAll<HTMLElement>('[data-translate]').forEach((element) => { 
    const key = element.dataset.translate as keyof typeof translations.en; 
    const translation = translations[currentLanguage][key]; 
    if (translation !== undefined) {
       element.textContent = translation; 
      } 
  }); 
  document.documentElement.lang = currentLanguage;
}
export const languageButton = document.querySelector<HTMLButtonElement>('#language-button');
// Кнопка смены языка на главной стрпнице
languageButton?.addEventListener('click', () => {
    toggleLanguage();
    window.dispatchEvent(new Event('languageChanged'));
});

updateLanguage();
