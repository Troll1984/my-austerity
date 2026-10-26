import { supabase } from './supabase';
import { translations, toggleLanguage, updateLanguage, currentLanguage } from './components/lang';

const authContainer = document.createElement('div');
authContainer.id = 'auth-container';

authContainer.innerHTML = `
  <div class="auth-card">
    <h2 id="auth-title" data-translate='titleAuth'>My Askesis</h2>
    <p id="auth-subtitle"  data-translate='messAuth'>Log in to your account</p>

    <form id="auth-form">
      <label for="auth-email" data-translate='emailAuth'>Email</label>
      <input id="auth-email" type="email" placeholder="you@example.com"  />
      <label for="auth-password" data-translate='passAuth'>Password</label>
      <input id="auth-password" type="password" placeholder="Мінімум 8 символів" autocomplete="current-password" minlength="8" required/>
      <button id="auth-submit" type="submit" data-translate='btnAuth'>Sign in</button>
    </form>
    <button id="language-button-auth" data-translate="language">EN</button>
    <button id="auth-toggle" type="button">Sign in</button>
    <p id="auth-message" role="status"></p>
    <span id="close"><i class="fa-solid fa-xmark"></i></span>
  </div>`;



document.body.prepend(authContainer);
updateLanguage();

const authForm = document.querySelector<HTMLFormElement>('#auth-form')!;
const emailInput = document.querySelector<HTMLInputElement>('#auth-email')!;
const passwordInput = document.querySelector<HTMLInputElement>('#auth-password')!;
const authTitle = document.querySelector<HTMLHeadingElement>('#auth-title')!;
const authSubtitle = document.querySelector<HTMLParagraphElement>('#auth-subtitle')!;
const authSubmit = document.querySelector<HTMLButtonElement>('#auth-submit')!;
const authToggle = document.querySelector<HTMLButtonElement>('#auth-toggle')!;
const authMessage = document.querySelector<HTMLParagraphElement>('#auth-message')!;
const languageBtn = document.querySelector<HTMLButtonElement>('#language-button-auth')!;

let isSignUp = false;
function updateAuthTexts(): void {
  updateLanguage();

  const language = sessionStorage.getItem('language') === 'uk' ? 'uk' : 'en';
  const t = translations[language];

  authTitle.textContent = isSignUp ? t.signUpTitle : t.signInTitle;
  authSubtitle.textContent = isSignUp ? t.signUpSubtitle : t.signInSubtitle;
  authSubmit.textContent = isSignUp ? t.signUpButton : t.signInButton;
  authToggle.textContent = isSignUp ? t.signUpToggle : t.signInToggle;
}
updateAuthTexts();

 languageBtn.textContent = currentLanguage === 'uk' ? 'UK' : 'EN'; 
 languageBtn.addEventListener('click', () => { 
  toggleLanguage();
  updateAuthTexts(); 
  languageBtn.textContent = currentLanguage === 'uk' ? 'UK' : 'EN'; 
  window.dispatchEvent(new Event('languageChanged')); 
});







authToggle.addEventListener('click', () => { 
  isSignUp = !isSignUp; updateAuthTexts(); 
  passwordInput.autocomplete = isSignUp ? 'current-password' : 'new-password'; 
  authMessage.textContent = ''; 
});


authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  authSubmit.disabled = true;
  authMessage.textContent = 'Wait...';
  try {
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log('Ответ Supabase при регистрации:', { data, error });
      if (error) throw error;
    if (data.user && data.user.identities?.length === 0) {
      authMessage.textContent = 'This account is already registered. Please sign in to your account.';
    } else if (data.session) {
      authMessage.textContent = 'Registration successful!';
    } else {
      authMessage.textContent =
        'Please confirm your registration. Check your email.';
    }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      authMessage.textContent = 'Вхід виконано!';
    }
  } catch (error) {
    authMessage.textContent =
      error instanceof Error
        ? error.message
        : 'Операція не вдала. Спробуйте ще раз.';
  } finally {
    authSubmit.disabled = false;
  }
});

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    authContainer.style.display = 'none';
    authMessage.textContent = '';

    const appContainer = document.querySelector<HTMLElement>('.container');

    if (appContainer) {
      appContainer.style.display = '';
    }
  }
});
// Проверяем текущую сессию при загрузке приложения.
async function initializeAuth() {
  const { error } = await supabase.auth.getSession();

  if (error) {
    authMessage.textContent = 'Не вдлося перевірити реєстрацію .';
    return;
  }
  authContainer.style.display = 'none';
  const appContainer = document.querySelector<HTMLElement>('.container');

  if (appContainer) {
    appContainer.style.display =  '';
  }
}

void initializeAuth();

export function openAuth() {
   authContainer.style.display = 'flex'; 
   authMessage.textContent = ''; }

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert('Не вдалося вийти з акаунта: ' + error.message);
  }
}

const reg = document.querySelector<HTMLButtonElement>('#reg'); 
const mainLanguageButton =
  document.querySelector<HTMLButtonElement>('#language-button');

mainLanguageButton?.addEventListener('click', () => {
  setTimeout(() => {
    void updateRegButton();
  }, 0);
});


async function updateRegButton() { 
  if (!reg) return; 
  const { data: { session } } = await supabase.auth.getSession(); 
  const language = sessionStorage.getItem('language') === 'uk' ? 'uk' : 'en'; 
  const t = translations[language]; const key = session ? 'MyAccount' : 'RegOpen'; 
  reg.dataset.translate = key; reg.textContent = t[key]; 
}



reg?.addEventListener('click', async () => {  
   const { data, error } = await supabase.auth.getSession();
    if (error) { alert('Не вдалося перевірити авторизацію.');
       return; 
      } 
    if (data.session) {
      const wantToSignOut = confirm( 'Ви вже увійшли в свій акаунт, бажаєте вийти?');
    if (wantToSignOut) {
         await signOut(); 
        } 
        return; 
      }
         openAuth(); 
  });
  const menu = document.querySelector<HTMLElement>('#menu'); 
  const main = document.querySelector<HTMLElement>('#main'); 
  const close = document.querySelector<HTMLElement>('#close');
  menu?.addEventListener('click', async (event) => { 
    event.preventDefault(); 
    const { data, error } = await supabase.auth.getSession(); 
    if (error) { 
      console.error('Помилка перевірки авторизації:', error); 
      return; 
    }
     if (!data.session) { 
      alert('Увійдіть у свій акаунт, щоб переглядати збережені аскези.') 
      return;
     } 
     window.location.href = './ascetic.html'; 
    });

    supabase.auth.onAuthStateChange(() => {
  void updateRegButton();
});

void updateRegButton();
main?.addEventListener('click', () => {
  window.location.href = './index.html';
})

close?.addEventListener('click', () => {
  authContainer.style.display = 'none';
})

