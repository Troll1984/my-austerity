import {  getForm } from '../componetsOur/dom';
import { supabase } from '../supabase';
import '../componetsOur/lang';
//Выключатель света




// Код для сохранения
const formAscetic = getForm('#form-ascetic');

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

        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
            return null;
        }
        return date;
    }
    let startDate = parseDate(dates[0]);
    let endDate = parseDate(dates[1]);
    if (!startDate || !endDate || endDate < startDate) {
        alert('Виберіть коректний період аскези!');
        return;
    }
    // Запрещаем начинать аскезу в прошлом
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDate < today) {
        alert('Дата початку не може бути в минулому!');
        return;
    }
    // Создаём аскезу только после успешных проверок
 try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
        alert('Спочатку увійдіть у свій акаунт!');
        formAscetic.reset();
        return;
    }

    // Шифруем данные аскезы
    const { data: encryptionData, error: encryptionError } =
        await supabase.functions.invoke('smooth-worker', {
            body: {
                action: 'encrypt',
                data: {
                    name: nameAscetic,
                    duration: timeAscetic,
                    expected_result: resultAscetic,
                    completed_days: [],
                    status: 'active'
                }
            }
        });
        console.log('Результат шифрования:', encryptionData);
console.log('Ошибка шифрования:', encryptionError);

    if (encryptionError) throw encryptionError;

    // Сохраняем зашифрованные данные в Supabase
    const { error: insertError } = await supabase
        .from('ascetics')
        .insert({
            user_id: userData.user.id,
            encrypted_data: encryptionData.encrypted_data,
            encryption_version: 1
        });

    if (insertError) throw insertError;

    window.location.href = './ascetic.html';

} catch (error) {
    console.error('Помилка збереження аскези:', error);
    alert('Не вдалося зберегти аскезу. Спробуй ще раз.');
}
});
