
export const translations = {
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
  },
  en: {
    MyAccount: 'MyAccount',
    titleAscetic: 'My Austerity',
    Description: 'Austerity Description',
    Duration: 'Duration',
    Result: 'Expected Result',
    BeginBtn: 'Begin Austerity',
    RegOpen: 'Sign In',
    Main: 'Main',
    Example: 'Example ',
    Sesiy: 'My Asceses',
    language: 'EN',
    titleAuth: 'My Askesis',
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
  },
};

type Language = 'uk' | 'en'; 
export let currentLanguage: Language = sessionStorage.getItem('language') === 'uk' ? 'uk' : 'en';
export function toggleLanguage(): void { 
  currentLanguage = currentLanguage === 'en' ? 'uk' : 'en'; sessionStorage.setItem('language', currentLanguage); 
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
}
export const languageButton = document.querySelector<HTMLButtonElement>('#language-button');
// Кнопка смены языка на главной стрпнице
languageButton?.addEventListener('click', () => {
    toggleLanguage();
    window.dispatchEvent(new Event('languageChanged'));
});

updateLanguage();
