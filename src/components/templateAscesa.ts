

// Создание шаблонов 
export interface AsceticTemplate {
  id: string;
  img: string;
  title: string;  
  description: string;
  result: string;
  durationDays: number;
}

export const templateStorageKey = 'my-ascetic:selected-template';

export const asceticTemplates: AsceticTemplate[] = [
  {
    id: 'no-sweets',
    img: './src/assets/img/image3.png',
    title: 'Без солодкого',   
    description: 'Не їсти цукерки, печиво та інші солодощі.',
    result: "Покращити здоров'я та самопочуття",
    durationDays: 7,
  },
  {
    id: 'less-social-media',
    img: './src/assets/img/image1.png',
    title: 'Менше соцмереж',   
    description: 'Не користуватися соцмережами після 21:00.',
    result: 'Звільнити час для відпочинку та покращити сон.',
    durationDays: 14,
  },
  {
    id: 'daily-reading',
    img: './src/assets/img/image2.png',
    title: 'Читати щодня',    
    description: 'Читати щонайменше 20 хвилин щодня.',
    result: 'Сформувати звичку читати регулярно.',
    durationDays: 21,
  },   
  {
    id: 'daily-english',
    img: './src/assets/img/image4.png',
    title: 'Англійська щодня ',   
    description: 'Англійська щодня по 30 хвилин на день',
    result: 'Знання мови на рівні A2',
    durationDays: 90,
  },   
  {
    id: 'daily-programming',
    img: './src/assets/img/image5.png',
    title: 'Програмування ',   
    description: 'Займатися програмуванням по 90 хвилин щодня.',
    result: 'Отримати роботу із зарплатою 3000$',
    durationDays: 21,
  },     
];