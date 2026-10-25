import type {Ascetic} from './loadAsceses'
// Получаем начало сегодняшнего дня по местному времени
export function getToday() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}
// Преобразуем дату формата 20.10.2026 в объект Date
export function parseDate(dateString: string): Date | null {
    let [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}
// Преобразуем Date в формат DD.MM.YYYY
export function formatDate(date: Date): string {
    let day = String(date.getDate()).padStart(2, '0') ;
    let month = String(date.getMonth() + 1).padStart(2, '0');

    return `${day}.${month}.${date.getFullYear()}`;
}
// Проверяем статус аскезы
 export function checkAscetic(element: Ascetic , startDate: Date, endDate: Date) {
    let today = getToday();
      // Нарушенную или завершённую аскезу не меняем
    if (element.status === 'failed' ||
        element.status === 'completed') {
        return;
    }
     let day = new Date(startDate);

    // Если начало аскезы ещё не наступило
    if (today < day) {
        element.status = 'planned';
        return;
    }
     // Проверяем все дни до сегодняшнего
   let end = endDate;

if (!end) return;

while (day < today && day <= end) {
    let dateString = formatDate(day);

    if (!element.completedDays.includes(dateString)) {
        element.status = 'failed';
        return;
    }

        day.setDate(day.getDate() + 1);
    }

    if (today > end) {
        element.status = 'completed';
    } else {
        element.status = 'active';
    }
}

