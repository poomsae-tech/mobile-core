export interface NotificationItem {
  id: string;
  type: 'fine' | 'warning' | 'info'; // Штраф, Внимание, Новое
  title: string;
  event?: string;
  athlete: string;
  details?: string;
  amount?: string;
  time: string;
  dateLabel: string;
}

export const NOTIFICATIONS_DATA = [
  {
    period: 'Сегодня',
    items: [
      {
        id: '1',
        type: 'fine',
        title: 'Штраф',
        event: 'Чемпионат России',
        athlete: 'Петров А.С.',
        details: 'Несоответствие веса',
        amount: '2 000 ₽ к оплате',
        time: '15:30 • 2 часа назад',
      },
      {
        id: '2',
        type: 'warning',
        title: 'ВНИМАНИЕ',
        event: 'Истекает страховка',
        athlete: 'Смирнова А.С.',
        details: 'Срок действия: 3 дня',
        time: '11:20',
      },
      {
        id: '3',
        type: 'info',
        title: 'Новое',
        event: 'Новый спортсмен в группе',
        athlete: 'Сергей Ковалев, 15 лет',
        time: 'Сегодня 10:20',
      },
    ],
  },
  {
    period: 'Вчера',
    items: [
      {
        id: '4',
        type: 'info',
        title: 'Новое',
        event: 'Изменение в расписании',
        athlete: 'Группа А',
        time: 'Вчера 18:00',
      },
    ],
  },
  {
    period: 'В этом месяце',
    items: [
      {
        id: '5',
        type: 'fine',
        title: 'Штраф',
        event: 'Турнир "Надежда"',
        athlete: 'Иванов И.И.',
        details: 'Опоздание на взвешивание',
        amount: '500 ₽ к оплате',
        time: '12.02.2024',
      },
    ],
  },
  {
    period: 'Ранее',
    items: [
      {
        id: '6',
        type: 'info',
        title: 'Архив',
        athlete: 'Система',
        details: 'Регистрация успешно пройдена',
        time: '01.01.2024',
      },
    ],
  },
];