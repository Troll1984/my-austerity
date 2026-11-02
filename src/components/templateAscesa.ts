import image1 from '../assets/img/image1.png';
import image2 from '../assets/img/image2.png';
import image3 from '../assets/img/image3.png';
import image4 from '../assets/img/image4.png';
import image5 from '../assets/img/image5.png';
// Создание шаблонов 
export interface AsceticTemplate {
  id: string;
  img: string;
  title: string;  
  titleEn: string;
  titleNl: string;
  description: string;
  descriptionEn: string;
  descriptionNl: string;
  result: string;
  resultEn: string;
  resultNl: string;
  durationDays: number;
}

export const templateStorageKey = 'my-ascetic:selected-template';

export const asceticTemplates: AsceticTemplate[] = [
  {
    id: 'no-sweets',
    img: image3,
    title: 'Без солодкого',   
    titleEn: 'No sweets',
    titleNl: 'Geen snoep',
    description: 'Не їсти цукерки, печиво та інші солодощі.',
    descriptionEn: 'Avoid candy, cookies, and other sweets.',
    descriptionNl: 'Eet geen snoep, koekjes en andere zoetigheden.',
    result: "Покращити здоров'я та самопочуття",
    resultEn: 'Improve your health and well-being',
    resultNl: 'Verbeter je gezondheid en welzijn',
    durationDays: 7,
  },
  {
    id: 'less-social-media',
    img: image1,
    title: 'Менше соцмереж',   
    titleEn: 'Less social media',
    titleNl: 'Minder sociale media',
    description: 'Не користуватися соцмережами після 21:00.',
    descriptionEn: 'Avoid social media after 9:00 PM.',
    descriptionNl: 'Gebruik na 21.00 uur geen sociale media.',
    result: 'Звільнити час для відпочинку та покращити сон.',
    resultEn: 'Make time to rest and improve your sleep.',
    resultNl: 'Maak tijd voor rust en slaap beter.',
    durationDays: 14,
  },
  {
    id: 'daily-reading',
    img: image2,
    title: 'Читати щодня',    
    titleEn: 'Read every day',
    titleNl: 'Elke dag lezen',
    description: 'Читати щонайменше 20 хвилин щодня.',
    descriptionEn: 'Read for at least 20 minutes every day.',
    descriptionNl: 'Lees elke dag minstens 20 minuten.',
    result: 'Сформувати звичку читати регулярно.',
    resultEn: 'Build a regular reading habit.',
    resultNl: 'Ontwikkel een vaste leesgewoonte.',
    durationDays: 21,
  },   
  {
    id: 'daily-english',
    img: image4,
    title: 'Англійська щодня ',   
    titleEn: 'English every day',
    titleNl: 'Elke dag Engels',
    description: 'Англійська щодня по 30 хвилин на день',
    descriptionEn: 'Study English for 30 minutes every day.',
    descriptionNl: 'Leer elke dag 30 minuten Engels.',
    result: 'Знання мови на рівні A2',
    resultEn: 'Reach A2 level in English.',
    resultNl: 'Bereik niveau A2 in het Engels.',
    durationDays: 90,
  },   
  {
    id: 'daily-programming',
    img: image5,
    title: 'Програмування ',   
    titleEn: 'Programming',
    titleNl: 'Programmeren',
    description: 'Займатися програмуванням по 90 хвилин щодня.',
    descriptionEn: 'Practice programming for 90 minutes every day.',
    descriptionNl: 'Programmeer elke dag 90 minuten.',
    result: 'Отримати роботу із зарплатою 3000$',
    resultEn: 'Get a job with a $3,000 salary.',
    resultNl: 'Vind een baan met een salaris van $3.000.',
    durationDays: 21,
  },     
];
