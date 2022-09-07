const TariffsPeriods = ({ type }) => {
  switch (type) {
    case 'duration_perpetual':
      return 'Бессрочный';
    case 'duration_once':
      return 'Единовременный';
    case 'duration_month_start':
      return 'Месяц (с 1го числа)';
    case 'duration_month_date':
      return 'Месяц (с даты по дату)';
    case 'duration_day':
      return 'Сутки (с часа по час)';
    case 'duration_year_date':
      return 'Год (с даты по дату)';
    case 'duration_quarter':
      return 'Квартал';
    case 'duration_custom_days':
      return 'Произволный период в днях';
    case 'duration_custom_months':
      return 'Произволный период в месяцах';
    default:
      return <></>;
  }
};

export default TariffsPeriods;
