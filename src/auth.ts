import { supabase } from './supabase';
import './components/lang';
const authContainer = document.createElement('div');
authContainer.id = 'auth-container';

authContainer.innerHTML = `
  <div class="auth-card">
    <h2 id="auth-title">My Askesis</h2>
    <p id="auth-subtitle">Увійдіть у свій акаунт або створіть новий.</p>

    <form id="auth-form">
      <label for="auth-email">Електронна пошта</label>
      <input id="auth-email" type="email" placeholder="you@example.com"  />
      <label for="auth-password">Пароль</label>
      <input id="auth-password" type="password" placeholder="Мінімум 8 символів" autocomplete="current-password" minlength="8" required/>
      <button id="auth-submit" type="submit">Увійти</button>
    </form>
    <button id="auth-toggle" type="button">Зареуструватись</button>
    <p id="auth-message" role="status"></p>
    <span id="close"><i class="fa-solid fa-xmark"></i></span>
  </div>`;

document.body.prepend(authContainer);

const authForm = document.querySelector<HTMLFormElement>('#auth-form')!;
const emailInput = document.querySelector<HTMLInputElement>('#auth-email')!;
const passwordInput = document.querySelector<HTMLInputElement>('#auth-password')!;
const authTitle = document.querySelector<HTMLHeadingElement>('#auth-title')!;
const authSubtitle = document.querySelector<HTMLParagraphElement>('#auth-subtitle')!;
const authSubmit = document.querySelector<HTMLButtonElement>('#auth-submit')!;
const authToggle = document.querySelector<HTMLButtonElement>('#auth-toggle')!;
const authMessage = document.querySelector<HTMLParagraphElement>('#auth-message')!;

let isSignUp = false;

authToggle.addEventListener('click', () => {
  isSignUp = !isSignUp;

  authTitle.textContent = isSignUp ? 'Створіть акаунт' : 'My Askesis';
  authSubtitle.textContent = isSignUp ? 'Зареєструватися, щоб зберігати свої аскези' : 'Увійдіть у свій акаунт';
  authSubmit.textContent = isSignUp ? 'Зареєструватися' : 'Увійти';
  authToggle.textContent = isSignUp ? 'Вже є акаунт? Увійти' : 'Немає акаунта? Зареєструватися';

  passwordInput.autocomplete = isSignUp ? 'new-password' : 'current-password';
  authMessage.textContent = '';
});

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  authSubmit.disabled = true;
  authMessage.textContent = 'Подожди...';
  try {
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (data.session) {
        authMessage.textContent = 'Рєстрація успішна!';
      } else {
        authMessage.textContent =
          'Підтвердіть реєстрацію. Зайдіть на вашу пошту';
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
async function updateRegButton() {
  if (!reg) return;

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    reg.dataset.translate = 'MyAccount';
  } else {
    reg.dataset.translate = 'RegOpen';
  }
    reg.textContent = '';
  reg.removeAttribute('data-translate');

  // Возвращаем ключ перевода
  reg.dataset.translate = session ? 'MyAccount' : 'RegOpen';

  // Обновляем текст согласно текущему языку
  const language = document.querySelector<HTMLElement>('#language-button');
  void language;

  reg.textContent = session ? 'My Account' : 'Sign In';
}



reg?.addEventListener('click', async () => {  
   const { data, error } = await supabase.auth.getSession();
    if (error) { alert('Не удалось проверить авторизацию.');
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
      console.error('Ошибка проверки авторизации:', error); 
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