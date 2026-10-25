
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
    signInToggle: "Already have an account? Sign in"
  },
};




type Language = 'uk' | 'en';

export let currentLanguage: Language = 'en';

export function toggleLanguage(): void {
  currentLanguage = currentLanguage === 'en' ? 'uk' : 'en';
   updateLanguage();
}

function updateLanguage(): void {
  document.querySelectorAll<HTMLElement>('[data-translate]').forEach((element) => {
    const key = element.dataset.translate as keyof typeof translations.en;

    element.textContent = translations[currentLanguage][key];
  });
}

const languageButton = document.querySelector<HTMLElement>('#language-button');
languageButton?.addEventListener('click', () => { 
      toggleLanguage();  
});
const BtnLangAuth = document.querySelector<HTMLFormElement>('#language-button-auth');
BtnLangAuth?.addEventListener('click', () => {
    toggleLanguage();
})

