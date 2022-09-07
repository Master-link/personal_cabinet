export const autoAddEndDate = (
  date,
  durationKind,
  customPeriod,
  alertMessage,
) => {
  if (!date) {
    return date;
  }

  const dateTransform = new Date(date);

  switch (durationKind) {
    case 'duration_month_start':
      return new Date(
        dateTransform.getFullYear(),
        dateTransform.getMonth() + 1,
        0,
      );
    case 'duration_month_date':
      return new Date(
        dateTransform.setMonth(
          dateTransform.getMonth() + 1,
        ),
      );
    case 'duration_day':
      return new Date(
        dateTransform.setDate(dateTransform.getDate() + 1),
      );
    case 'duration_year_date':
      return new Date(
        dateTransform.setFullYear(
          dateTransform.getFullYear() + 1,
        ),
      );
    case 'duration_quarter':
      return new Date(
        dateTransform.setMonth(
          dateTransform.getMonth() + 3,
        ),
      );
    case 'duration_custom_days':
      if (!customPeriod.value) {
        alert(alertMessage);
        return null;
      }
      return new Date(
        dateTransform.setDate(
          dateTransform.getDate() +
            parseInt(customPeriod.value),
        ),
      );
    case 'duration_custom_months':
      if (!customPeriod.value) {
        alert(alertMessage);
        return null;
      }
      return new Date(
        dateTransform.setMonth(
          dateTransform.getMonth() +
            parseInt(customPeriod.value),
        ),
      );
    default:
      return null;
  }
};
