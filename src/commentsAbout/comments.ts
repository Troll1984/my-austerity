import { getElement } from '../componetsOur/dom';

const formComments = document.querySelector<HTMLFormElement>('#form-comments');
if (!formComments) {
    throw new Error('Форма комментариев не найдена');
}
const showComments = getElement('.show-comments');
const counter = getElement('#counter');
const nameInput = formComments.elements.namedItem('user.name');
const commentInput = formComments.elements.namedItem('comment');
if (!(nameInput instanceof HTMLInputElement) || !(commentInput instanceof HTMLTextAreaElement)) {
    throw new Error('Поля форми коментарів не знайдені');
}

type Comment = {
    name: string;
    comment: string;
};
function getComments(): Comment[] {
    const data = localStorage.getItem('about-comments');

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data) as Comment[];
    } catch {
        return [];
    }
}

formComments.addEventListener('submit', function(event): void {
    event.preventDefault();
    const user = nameInput.value.trim();
    const comment = commentInput.value.trim();
    if (!user || !comment) {
        return;
    }
    const newComment: Comment = {
        name: user,
        comment
    };

    const comments = getComments();
    comments.push(newComment);
    localStorage.setItem('about-comments', JSON.stringify(comments));
    formComments.reset();
    showCommetar();
});
showCommetar();

function showCommetar(): void {
    showComments.replaceChildren();
    const comments = getComments();
    for (const [index, comment] of comments.entries()) {
        const item = document.createElement('article');
        item.className = 'comment';
        const content = document.createElement('div');
        content.className = 'comment-info';
        const author = document.createElement('h3');
        author.textContent = comment.name;
        const text = document.createElement('p');
        text.textContent = comment.comment;
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.dataset.index = String(index);
        removeButton.setAttribute('aria-label', 'Видалити коментар');
        removeButton.textContent = '✖';
        content.append(author, text);
        item.append(content, removeButton);
        showComments.append(item);
    }
    counter.textContent = `${comments.length}`;
}
showComments.addEventListener('click', function(event) {
     if (!(event.target instanceof Element)) {
        return;
    }
    const button = event.target.closest<HTMLButtonElement>('button[data-index]');
      if (!button || !showComments.contains(button)) {
        return;
    }
    const index = Number(button.dataset.index);
    const comments = getComments();
     if (!Number.isInteger(index) || index < 0 || index >= comments.length) {
        return;
    }
     comments.splice(index, 1);

    localStorage.setItem('about-comments', JSON.stringify(comments));

    showCommetar();
});
   
