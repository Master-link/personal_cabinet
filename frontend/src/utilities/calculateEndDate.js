export const calculateEndDate = (date, tariff) => {
  const newDate = new Date(date);
  switch (tariff.duration_kind) {
    case 'duration_day':
      return new Date(newDate.setHours(48));
    case 'duration_month_date':
      return new Date(
        newDate.setMonth(newDate.getMonth() + 1),
      );
    case 'duration_year_date':
      return new Date(
        newDate.setFullYear(newDate.getFullYear() + 1),
      );
    case 'duration_quarter':
      return new Date(
        newDate.setMonth(newDate.getMonth() + 3),
      );
    case 'duration_custom_months':
      return new Date(
        newDate.setMonth(
          newDate.getMonth() +
            parseInt(tariff.extra.custom_period),
        ),
      );
    case 'duration_custom_days':
      return new Date(
        newDate.setDate(
          newDate.getDate() +
            parseInt(tariff.extra.custom_period),
        ),
      );
    default:
      return null;
  }
};
