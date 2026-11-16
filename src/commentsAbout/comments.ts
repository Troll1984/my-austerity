import { supabase } from '../supabase';
import { getElement } from '../componetsOur/dom';

const formComments = document.querySelector<HTMLFormElement>('#form-comments');
if (!formComments) {
    throw new Error('Форма комментариев не найдена');
}
const showComments = getElement('.show-comments');
const counter = getElement('#counter');

const commentInput = formComments.elements.namedItem('comment');
if (!(commentInput instanceof HTMLTextAreaElement)) {
    throw new Error('Поля форми коментарів не знайдені');
}

type Comment = {
    id: string;
    user_id: string;
    author: string;
    comment: string;
    created_at: string;
};

async function getComments(): Promise<Comment[]> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Помилка завантаження коментарів:', error);
        return [];
    }

    return data as Comment[];
}

//
formComments.addEventListener('submit', async function(event): Promise<void> {
    event.preventDefault();
    const comment = commentInput.value.trim();
    if (!comment) {
        return;
    }
    // Получаем текущего пользователя
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
        alert('Для відправлення коментаря потрібно увійти в акаунт.');
        return;
    }
    // Получаем никнейм
    const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('user_id', user.id)
    .single();

if (profileError || !profile?.nickname) {
    console.error('Помилка отримання профілю:', profileError);
    alert('Не вдалося отримати ваш нікнейм.');
    return;
}

const nickname = profile.nickname;
    // Сохраняем комментарий
    const { error } = await supabase
        .from('comments')
        .insert({
            user_id: user.id,
            author: nickname,
            comment: comment
        });
    if (error) {
        console.error('Помилка збереження:', error);
        alert('Не вдалося зберегти коментар.');
        return;
    }
    formComments.reset();
    await addNewComment();
});
//


async function showCommetar(): Promise<void> {
    showComments.replaceChildren();

    const { data: { user } } = await supabase.auth.getUser();
    const comments = await getComments();

    for (const comment of comments) {
        const item = document.createElement('article');
        item.className = 'comment';

        const content = document.createElement('div');
        content.className = 'comment-info';

        const author = document.createElement('h3');
        author.textContent = comment.author;

        const text = document.createElement('p');
        text.textContent = comment.comment;

        content.append(author, text);
        item.append(content);

        // Кнопка удаления только для автора
        if (user && user.id === comment.user_id) {
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.dataset.id = comment.id;
            removeButton.setAttribute('aria-label', 'Видалити коментар');
            removeButton.textContent = '✖';

            item.append(removeButton);
        }

        showComments.append(item);
    }

    counter.textContent = `${comments.length}`;
}



async function addNewComment(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return;
    }

    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Помилка отримання коментаря:', error);
        return;
    }

    const item = document.createElement('article');
    item.className = 'comment';

    const content = document.createElement('div');
    content.className = 'comment-info';

    const author = document.createElement('h3');
    author.textContent = data.author;

    const text = document.createElement('p');
    text.textContent = data.comment;

    content.append(author, text);
    item.append(content);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.dataset.id = data.id;
    removeButton.setAttribute('aria-label', 'Видалити коментар');
    removeButton.textContent = '✖';

    item.append(removeButton);

    showComments.prepend(item);
      counter.textContent = String(Number(counter.textContent) + 1);
}




showComments.addEventListener('click', async function(event): Promise<void> {
    if (!(event.target instanceof Element)) {
        return;
    }
    const button = event.target.closest<HTMLButtonElement>('button[data-id]');
    if (!button || !showComments.contains(button)) {
        return;
    }
    const id = button.dataset.id;
    if (!id) {
        return;
    }
   const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return;
    }
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error('Помилка видалення:', error);
        alert('Не вдалося видалити коментар.');
        return;
    }
    const item = button.closest<HTMLElement>('.comment');

if (item) {
    item.remove();
}

counter.textContent = String(Math.max(0, Number(counter.textContent) - 1));
});
showCommetar();
   
