import { supabase } from '../supabase';
import { translations, toggleLanguage, updateLanguage, currentLanguage } from '../componetsOur/lang';

const authContainer = document.createElement('div');
authContainer.id = 'auth-container';

authContainer.innerHTML = `
  <div class="auth-card">
    <h2 id="auth-title" data-translate='titleAuth'>My Askesis</h2>
    <p id="auth-subtitle"  data-translate='messAuth'>Log in to your account</p>

  <form id="auth-form">
    <label for="auth-nickname">Nickname</label>
    <input id="auth-nickname" type="text" placeholder="Your nickname" minlength="3" maxlength="20" autocomplete="nickname"/>
    <label for="auth-email" data-translate="emailAuth">Email</label>
    <input id="auth-email" type="email" placeholder="you@example.com" required/>
    <label for="auth-password" data-translate="passAuth">Password</label>
    <input id="auth-password" type="password" placeholder="Мінімум 8 символів" autocomplete="current-password" minlength="8" required/>
    <button id="auth-submit" type="submit" data-translate="btnAuth">Sign in</button>
  </form>
     <button id="language-button-auth" data-translate="language">EN</button>
     <button id="auth-toggle" type="button">Sign in</button>
    
    <p id="auth-message" role="status"></p>
    <button id="auth-resend" type="button" hidden>Отправить письмо ещё раз</button>
    <span id="close"><i class="fa-solid fa-xmark"></i></span>
  </div>`;

document.body.prepend(authContainer);
const nicknameInput = document.querySelector<HTMLInputElement>('#auth-nickname')!;
const nicknameLabel = nicknameInput.previousElementSibling as HTMLLabelElement;

updateLanguage();

const authForm = document.querySelector<HTMLFormElement>('#auth-form')!;
const emailInput = document.querySelector<HTMLInputElement>('#auth-email')!;
const passwordInput = document.querySelector<HTMLInputElement>('#auth-password')!;
const authTitle = document.querySelector<HTMLHeadingElement>('#auth-title')!;
const authSubtitle = document.querySelector<HTMLParagraphElement>('#auth-subtitle')!;
const authSubmit = document.querySelector<HTMLButtonElement>('#auth-submit')!;
const authToggle = document.querySelector<HTMLButtonElement>('#auth-toggle')!;
const authMessage = document.querySelector<HTMLParagraphElement>('#auth-message')!;
const resendButton = document.querySelector<HTMLButtonElement>('#auth-resend')!;
const languageBtn = document.querySelector<HTMLButtonElement>('#language-button-auth')!;

let isSignUp = false;
function updateAuthTexts(): void {
  updateLanguage();

  const language = currentLanguage;
  const t = translations[language];

  authTitle.textContent = isSignUp ? t.signUpTitle : t.signInTitle;
  authSubtitle.textContent = isSignUp ? t.signUpSubtitle : t.signInSubtitle;
  authSubmit.textContent = isSignUp ? t.signUpButton : t.signInButton;
  authToggle.textContent = isSignUp ? t.signInToggle : t.signUpToggle;

  // Никнейм нужен только при регистрации
nicknameInput.style.display = isSignUp ? 'block' : 'none';
nicknameLabel.style.display = isSignUp ? 'block' : 'none';

nicknameInput.required = isSignUp;

passwordInput.autocomplete = isSignUp
  ? 'new-password'
  : 'current-password';
}
updateAuthTexts();

 languageBtn.textContent = currentLanguage.toUpperCase(); 
 languageBtn.addEventListener('click', () => { 
  toggleLanguage();
  updateAuthTexts(); 
  languageBtn.textContent = currentLanguage.toUpperCase(); 
  window.dispatchEvent(new Event('languageChanged')); 
});

authToggle.addEventListener('click', () => { 
  isSignUp = !isSignUp;
  updateAuthTexts(); 
  authMessage.textContent = ''; 
  resendButton.hidden = true;
});

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const nickname = nicknameInput.value.trim();
  if (isSignUp && nickname.length < 3) {
  authMessage.textContent = 'Nickname must contain at least 3 characters.';
  return;
}
  authSubmit.disabled = true;
  authMessage.textContent = 'Wait...';
  try {
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        data: {
        nickname: nickname
      }
  }
      });
      console.log('Ответ Supabase при регистрации:', { data, error });
      if (error) throw error;
    if (data.user && data.user.identities?.length === 0) {
      // Supabase masks duplicate emails in the signUp response. Do not offer a
      // resend action here: retrying registration must not trigger another
      // confirmation message or suggest that the new nickname was applied.
      authMessage.textContent = 'An account with this email may already exist. Sign in to use it; registration will not change its nickname.';
      resendButton.hidden = true;
    } else if (data.session) {
      // Update the header directly from the nickname just submitted. The auth
      // event and profile insert can finish in either order.
      await updateRegButton(data.session, nickname);
      authMessage.textContent = 'Registration successful!';
      resendButton.hidden = true;
    } else {
      authMessage.textContent =
        'Please confirm your registration. Check your email.';
      resendButton.hidden = false;
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

resendButton.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  if (!email) {
    authMessage.textContent = 'Enter your email address first.';
    return;
  }

  resendButton.disabled = true;
  authMessage.textContent = 'Sending confirmation email...';
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
    authMessage.textContent = 'Confirmation email sent. Check your inbox and spam folder.';
  } catch (error) {
    authMessage.textContent = error instanceof Error
      ? error.message
      : 'Could not resend the confirmation email. Please try again later.';
  } finally {
    resendButton.disabled = false;
  }
});
let nicknameCheckInProgress = false;
async function checkUserNickname(userId: string) {
  if (nicknameCheckInProgress) return;

  nicknameCheckInProgress = true;

  try {
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user || user.id !== userId) return;

  const { data, error } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Ошибка проверки никнейма:', error);
    return;
  }

  // Если никнейм уже есть, ничего не делаем
  if (data?.nickname?.trim()) return;

  // Use a nickname already stored in auth metadata before asking existing users.
  const savedNickname = user.user_metadata?.nickname?.trim();
  const nickname = savedNickname || prompt('Придумайте свой никнейм (от 3 до 20 символов):');

  if (!nickname) return;

  const cleanNickname = nickname.trim();

  if (cleanNickname.length < 3 || cleanNickname.length > 20) {
    alert('Никнейм должен содержать от 3 до 20 символов.');
    return;
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: { nickname: cleanNickname },
  });
  if (metadataError) console.error('Ошибка сохранения никнейма в аккаунте:', metadataError);

  const profileWrite = data
    ? await supabase.from('profiles').update({ nickname: cleanNickname }).eq('user_id', userId)
    : await supabase.from('profiles').insert({ user_id: userId, nickname: cleanNickname });
  const updateError = profileWrite.error;

  if (updateError) {
    console.error('Ошибка сохранения никнейма:', updateError);
    alert('Не удалось сохранить никнейм. Попробуйте ещё раз.');
    return;
  }
  void updateRegButton();
   } finally {
    nicknameCheckInProgress = false;
  }
}



supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    void checkUserNickname(session.user.id);
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
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    authMessage.textContent = 'Не вдлося перевірити реєстрацію .';
    return;
  }
  if (data.session) {
  await checkUserNickname(data.session.user.id);
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


async function updateRegButton(
  knownSession?: Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session'],
  submittedNickname?: string,
) { 
  if (!reg) return; 
  const session = knownSession ?? (await supabase.auth.getSession()).data.session;
  const language = currentLanguage; 
  const t = translations[language]; 
  if (!session) {
    reg.dataset.translate = 'RegOpen';
    reg.textContent = t.RegOpen;
    return;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('user_id', session.user.id)
    .maybeSingle();
  const nickname = submittedNickname?.trim()
    || profile?.nickname?.trim()
    || session.user.user_metadata?.nickname?.trim();

  // A signed-in account without a nickname should still look unregistered
  // until the nickname prompt has successfully saved one.
  if (!nickname) {
    reg.dataset.translate = 'RegOpen';
    reg.textContent = t.RegOpen;
    return;
  }

  // Remove the translation key so language updates do not overwrite the nickname.
  delete reg.dataset.translate;
  reg.replaceChildren();
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-user-check';
  const label = document.createElement('span');
  label.textContent = nickname;
  reg.append(icon, label);
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

