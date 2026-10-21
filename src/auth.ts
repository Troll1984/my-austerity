import { supabase } from './supabase';
console.log('AUTH.TS ЗАПУСТИЛСЯ');
const authContainer = document.createElement('div');
authContainer.id = 'auth-container';

authContainer.innerHTML = `
  <div class="auth-card">
    <h2 id="auth-title">My Askesis</h2>
    <p id="auth-subtitle">Войди в свой аккаунт или создай новый</p>

    <form id="auth-form">
      <label for="auth-email">Электронная почта</label>
      <input
        id="auth-email"
        type="email"
        placeholder="you@example.com"
        autocomplete="email"
        required
      />

      <label for="auth-password">Пароль</label>
      <input
        id="auth-password"
        type="password"
        placeholder="Минимум 8 символов"
        autocomplete="current-password"
        minlength="8"
        required
      />

      <button id="auth-submit" type="submit">Войти</button>
    </form>

    <button id="auth-toggle" type="button">
      Нет аккаунта? Зарегистрироваться
    </button>

    <p id="auth-message" role="status"></p>
  </div>
`;

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

  authTitle.textContent = isSignUp ? 'Создать аккаунт' : 'My Askesis';
  authSubtitle.textContent = isSignUp
    ? 'Зарегистрируйся, чтобы сохранять свои аскезы'
    : 'Войди в свой аккаунт';

  authSubmit.textContent = isSignUp ? 'Зарегистрироваться' : 'Войти';

  authToggle.textContent = isSignUp
    ? 'Уже есть аккаунт? Войти'
    : 'Нет аккаунта? Зарегистрироваться';

  passwordInput.autocomplete = isSignUp
    ? 'new-password'
    : 'current-password';

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
        authMessage.textContent = 'Регистрация успешна!';
      } else {
        authMessage.textContent =
          'Проверь почту и подтверди регистрацию, если потребуется.';
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      authMessage.textContent = 'Вход выполнен!';
    }
  } catch (error) {
    authMessage.textContent =
      error instanceof Error
        ? error.message
        : 'Не удалось выполнить операцию. Попробуй ещё раз.';
  } finally {
    authSubmit.disabled = false;
  }
});

supabase.auth.onAuthStateChange((event, session) => {
  const isAuthenticated = Boolean(session);

  authContainer.style.display = isAuthenticated ? 'none' : 'flex';

  const appContainer = document.querySelector<HTMLElement>('.container');

  if (appContainer) {
    appContainer.style.display = isAuthenticated ? '' : 'none';
  }

  if (event === 'SIGNED_IN' && session) {
    authMessage.textContent = '';
  }
});

// Проверяем текущую сессию при загрузке приложения.
async function initializeAuth() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    authMessage.textContent = 'Не удалось проверить авторизацию.';
    return;
  }

  const isAuthenticated = Boolean(data.session);

  authContainer.style.display = isAuthenticated ? 'none' : 'flex';

  const appContainer = document.querySelector<HTMLElement>('.container');

  if (appContainer) {
    appContainer.style.display = isAuthenticated ? '' : 'none';
  }
}

void initializeAuth();

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert('Не удалось выйти из аккаунта: ' + error.message);
  }
}