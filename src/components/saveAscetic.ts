import { getElement, getForm } from '../components/dom';
import { supabase } from '../supabase';
import './lang';


// Код для сохранения
const formAscetic = getForm('#form-ascetic');
const menu = getElement('#menu');
formAscetic.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formData = new FormData(formAscetic);
    let nameAscetic = String(formData.get('name')) ?? '';
    let timeAscetic = String(formData.get('time')) ?? '';
    let resultAscetic = String(formData.get('result')) ?? '';

    // Проверяем заполнение полей
    if (!nameAscetic || !timeAscetic || !resultAscetic) {
        alert('Заполни все поля!');
        return;
    }

    // Проверяем, что выбраны обе даты
    let dates = timeAscetic.split(' to ');

    if (dates.length !== 2 || !dates[0] || !dates[1]) {
        alert('Выбери дату начала и окончания аскезы!');
        return;
    }

    // Проверяем корректность диапазона
    function parseDate(value: string): Date | null {
        let [day, month, year] = value.split('.').map(Number);
        let date = new Date(year, month - 1, day);

        if (
            date.getDate() !== day ||
            date.getMonth() !== month - 1 ||
            date.getFullYear() !== year
        ) {
            return null;
        }

        return date;
    }

    let startDate = parseDate(dates[0]);
    let endDate = parseDate(dates[1]);

    if (!startDate || !endDate || endDate < startDate) {
        alert('Выбери корректный период аскезы!');
        return;
    }

    // Запрещаем начинать аскезу в прошлом
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
        alert('Дата начала не может быть в прошлом!');
        return;
    }

    // Создаём аскезу только после успешных проверок
   const { data: userData, error: userError } = await supabase.auth.getUser();

if (userError || !userData.user) {
    alert('Сначала войди в свой аккаунт!');
    return;
}

const { error: insertError } = await supabase
    .from('ascetics')
    .insert({
        user_id: userData.user.id,
        name: nameAscetic,
        duration: timeAscetic,
        expected_result: resultAscetic,
        completed_days: [],
        status: 'active'
    });

if (insertError) {
    console.error('Ошибка сохранения аскезы:', insertError);
    alert('Не удалось сохранить аскезу. Попробуй ещё раз.');
    return;
}

window.location.href = './ascetic.html';
});
menu.addEventListener('click', async () => {
   
        window.location.href = './ascetic.html';
    
});