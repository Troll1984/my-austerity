import { getElement } from './dom';
import { supabase } from '../supabase';
import './lang';
import './sliderAscetica';


const saveAscetic = getElement('.save-ascetic');
const back = getElement('.btn');
interface Ascetic {
    id: string;
    nameAscetic: string;
    timeAscetic: string;
    resultAscetic: string;
    completedDays: string[];
    status: 'active' | 'failed' | 'completed' | 'planned';
}
let ascetics: Ascetic[] = [];

async function loadAscetics() {
    const { data, error } = await supabase
        .from('ascetics')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Ошибка загрузки аскез:', error);
        alert('Не удалось загрузить аскезы. Попробуй обновить страницу.');
        return;
    }

    ascetics = (data ?? []).map((row) => ({
        id: row.id,
        nameAscetic: row.name,
        timeAscetic: row.duration,
        resultAscetic: row.expected_result,
        completedDays: row.completed_days ?? [],
        status: row.status
    }));

    renderAscetics();
}
back.addEventListener('click', () => {
     window.location.href = './index.html';
})
// Получаем начало сегодняшнего дня по местному времени
function getToday() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

// Преобразуем дату формата 20.10.2026 в объект Date
function parseDate(dateString: string): Date | null {
    let [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
}

// Преобразуем Date в формат DD.MM.YYYY
function formatDate(date: Date): string {
    let day = String(date.getDate()).padStart(2, '0') ;
    let month = String(date.getMonth() + 1).padStart(2, '0');

    return `${day}.${month}.${date.getFullYear()}`;
}
// Проверяем статус аскезы
function checkAscetic(element: Ascetic , startDate: Date, endDate: Date) {
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
// Создаём карточки
function renderAscetics() {
    saveAscetic.innerHTML = '';
    let count: number = 0;  
    ascetics.forEach((element: Ascetic , index: number) => {
        if (!Array.isArray(element.completedDays)) {
            element.completedDays = [];
        }    
        
        let card = document.createElement('div');       
        card.classList.add('ascetic-card');
        count++;
        card.dataset.id = String(count);                
        let titleCard = document.createElement('h5');
        let gotName = document.createElement('h2');
        let gotRes  = document.createElement('h2');
        let duren  = document.createElement('h2');
        let name = document.createElement('h1');
        let time = document.createElement('p');
        let result = document.createElement('h1');
        let status = document.createElement('h1');
        let resizeHandle = document.createElement('div'); 
        resizeHandle.classList.add('resize-handle');

        titleCard.textContent = `Аскеза №${count}`;
        gotName.textContent = `Опис Аскези`;       
        name.textContent = ` ${element.nameAscetic}`;
        duren.textContent = `Тривалість Аскези`; 
        time.textContent = element.timeAscetic;
        gotRes.textContent = `Очікуваний результат`;
        result.textContent = ` ${element.resultAscetic}`;

        // Разбираем диапазон Flatpickr
        let dates = element.timeAscetic.split(' to ');
        let startDate = parseDate(dates[0]);
        if (!startDate) {
            return;
        }
        let endDate = dates[1] ? parseDate(dates[1]) : new Date(startDate);
            if (!endDate) {
                return;
            }
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        // Проверяем корректность дат
        if (
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime()) ||
            endDate < startDate
        ) {
            card.append(name, time, result);
            saveAscetic.append(card);
            return;
        }

        checkAscetic(element, startDate, endDate);

        // Статус
        function updateStatus() {
            status.className = '';

            if (element.status === 'failed') {
                status.textContent = '❌ Аскеза не соблюдена';
                status.classList.add('status-failed');
            } else if (element.status === 'completed') {
                status.textContent = '✅ Аскеза завершена';
                status.classList.add('status-completed');
            } else if (element.status === 'planned') {
                status.textContent = '⏳ Аскеза ещё не началась';
                status.classList.add('status-active');
            } else {
                status.textContent = '🟢 Аскеза в процессе';
                status.classList.add('status-active');
            }
        }

        // Прогресс
        let totalDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;

        let progressTitle = document.createElement('h3');
        progressTitle.textContent = 'Progress';

        let progressText = document.createElement('p');
        let progressBar = document.createElement('progress');

        progressBar.max = totalDays;

        function updateProgress() {
            let completed = element.completedDays.length;

            progressBar.value = completed;

            progressText.textContent =
                `${completed} / ${totalDays} days (${Math.round(completed / totalDays * 100)}%)`;
        }

        // Календарь
        let calendarTitle = document.createElement('h3');
        calendarTitle.textContent = 'Mark your days';

        let calendar = document.createElement('div');
        calendar.classList.add('ascetic-calendar');

        let offset = (startDate.getDay() + 6) % 7;

        for (let i = 0; i < offset; i++) {
            let emptyDay = document.createElement('span');
            emptyDay.classList.add('empty-day');
            calendar.append(emptyDay);
        }

        let today = getToday();

        for (let i = 0; i < totalDays; i++) {
            let currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            let dateString = formatDate(currentDate);
            let dayButton = document.createElement('button');

            dayButton.type = 'button';
            dayButton.textContent = String(currentDate.getDate());
            dayButton.classList.add('calendar-day');
            dayButton.title = dateString;

            let isCompleted =
                element.completedDays.includes(dateString);

            let isToday =
                currentDate.getTime() === today.getTime();

            if (isCompleted) {
                dayButton.classList.add('completed');
            }

            // Только сегодня можно поставить отметку.
            // Прошлые и будущие дни заблокированы.
            dayButton.disabled =
                !isToday ||
                element.status === 'failed' ||
                element.status === 'completed';

            dayButton.setAttribute(
                'aria-pressed',
                String(isCompleted)
            );

           dayButton.addEventListener('click', async () => {
                // Повторная проверка непосредственно при клике
                let actualToday = getToday();

                if (
                    currentDate.getTime() !== actualToday.getTime() ||
                    element.status === 'failed' ||
                    element.status === 'completed'
                ) {
                    return;
                }

                let dayIndex =
                    element.completedDays.indexOf(dateString);

               if (dayIndex === -1) {
                    element.completedDays.push(dateString);
                } else {
                    // Сегодняшнюю отметку можно снять до полуночи
                    element.completedDays.splice(dayIndex, 1);
                }

                const { error } = await supabase
                    .from('ascetics')
                    .update({
                        completed_days: element.completedDays
                    })
                    .eq('id', element.id);

                if (error) {
                    console.error('Ошибка сохранения отметки:', error);
                    alert('Не удалось сохранить отметку. Попробуй ещё раз.');

                    // Возвращаем предыдущий список отметок при ошибке
                    if (dayIndex === -1) {
                        element.completedDays.pop();
                    } else {
                        element.completedDays.splice(dayIndex, 0, dateString);
                    }

                    return;
                }

                renderAscetics();
            });

            calendar.append(dayButton);
        }

        // Удаление карточки
        let deleteButton = document.createElement('button');
        
        
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        

        deleteButton.addEventListener('click', async () => {
    const confirmed = confirm('Ты действительно хочешь удалить эту аскезу?');

    if (!confirmed) {
        return;
    }

    const { error } = await supabase
        .from('ascetics')
        .delete()
        .eq('id', element.id);

    if (error) {
        console.error('Ошибка удаления аскезы:', error);
        alert('Не удалось удалить аскезу. Попробуй ещё раз.');
        return;
    }

    ascetics.splice(index, 1);
    renderAscetics();
});        

        updateStatus();         
        card.append(              
            titleCard,        
            gotName,
            name,
            duren,
            time,           
            gotRes,
            result,
            status,
            progressTitle,
            progressText,
            progressBar,
            calendarTitle,
            calendar,
            deleteButton,
            resizeHandle
        );        

        resizeHandle.addEventListener('pointerdown', (event: PointerEvent) => { 
            event.preventDefault();
            console.log('Нажатие на ручку работает!');
        const cards = document.querySelectorAll<HTMLElement>('.ascetic-card'); 
        const startY = event.clientY; 
        const initialSizes = Array.from(cards).map(card => { 
        const calendar = card.querySelector<HTMLElement>('.ascetic-calendar');
        return {card, height: card.getBoundingClientRect().height, calendar, calendarHeight: calendar ? parseFloat(getComputedStyle(calendar).maxHeight) : 0}; 
        });       
       
         const onMove = (moveEvent: PointerEvent) => { 
            console.log('Мышка движется!', moveEvent.clientY);
        const delta = Math.max(0, moveEvent.clientY - startY); 
        initialSizes.forEach(item => {
             item.card.style.height = `${item.height + delta}px`; 
             if (item.calendar) { 
                item.calendar.style.maxHeight = `${item.calendarHeight + delta}px`; 
            } 
        });
     }; 
     
    
    const onUp = () => {
         window.removeEventListener('pointermove', onMove); 
         window.removeEventListener('pointerup', onUp);
         window.removeEventListener('pointercancel', onUp); 
        };
         window.addEventListener('pointermove', onMove); 
         window.addEventListener('pointerup', onUp); 
         window.addEventListener('pointercancel', onUp);
    });
       
      saveAscetic.append(card);
        updateProgress();
    });
}
   
   





// Перерисовываем карточки и проверяем пропущенные дни
function checkAllAscetics() {
    renderAscetics();
}

void loadAscetics();

// Планируем следующую проверку на местную полночь
function scheduleMidnightCheck() {
    let now = new Date();
    let nextMidnight = new Date(now);

    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);

    let delay = nextMidnight.getTime() - now.getTime();

    setTimeout(() => {
        checkAllAscetics();
        scheduleMidnightCheck();
    }, delay);
}

scheduleMidnightCheck();

// Проверяем время, когда пользователь возвращается на вкладку
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        checkAllAscetics();
    }
});

// Проверяем время, когда пользователь возвращается в окно
window.addEventListener('focus', checkAllAscetics);