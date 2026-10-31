

// Создание шаблонов 
export interface AsceticTemplate {
  id: string;
  title: string;
  icon: string;
  description: string;
  result: string;
  durationDays: number;
}

export const templateStorageKey = 'my-ascetic:selected-template';

export const asceticTemplates: AsceticTemplate[] = [
  {
    id: 'no-sweets',
    title: 'Без солодкого',
    icon: '🍫',
    description: 'Не їсти цукерки, печиво та інші солодощі.',
    result: 'Розвинути самодисципліну та зменшити кількість солодкого.',
    durationDays: 7,
  },
  {
    id: 'less-social-media',
    title: 'Менше соцмереж',
    icon: '📱',
    description: 'Не користуватися соцмережами після 21:00.',
    result: 'Звільнити час для відпочинку та покращити сон.',
    durationDays: 14,
  },
  {
    id: 'daily-reading',
    title: 'Читати щодня',
    icon: '📖',
    description: 'Читати щонайменше 20 хвилин щодня.',
    result: 'Сформувати звичку читати регулярно.',
    durationDays: 21,
  },
   {
    id: 'daily-reading',
    title: 'Читати щодня',
    icon: '📖',
    description: 'Читати щонайменше 20 хвилин щодня.',
    result: 'Сформувати звичку читати регулярно.',
    durationDays: 21,
  },
];