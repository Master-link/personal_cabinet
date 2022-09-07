import { FormattedMessage } from 'react-intl';

export const tariffPeriods = [
  {
    id: '',
    title: (
      <FormattedMessage
        id="select_tariff_period"
        defaultMessage="Select tariff period"
      />
    ),
  },
  {
    id: 'duration_perpetual',
    title: (
      <FormattedMessage
        id="period.perpetual"
        defaultMessage="Perpetual"
      />
    ),
  },
  {
    id: 'duration_once',
    title: (
      <FormattedMessage
        id="period.once"
        defaultMessage="Once time"
      />
    ),
  },
  {
    id: 'duration_month_start',
    title: (
      <FormattedMessage
        id="period.month_start"
        defaultMessage="Month start"
      />
    ),
  },
  {
    id: 'duration_month_date',
    title: (
      <FormattedMessage
        id="period.month_date"
        defaultMessage="Month date"
      />
    ),
  },
  {
    id: 'duration_day',
    title: (
      <FormattedMessage
        id="period.day"
        defaultMessage="Day"
      />
    ),
  },
  {
    id: 'duration_year_date',
    title: (
      <FormattedMessage
        id="period.year_date"
        defaultMessage="Year date"
      />
    ),
  },
  {
    id: 'duration_quarter',
    title: (
      <FormattedMessage
        id="period.quarter"
        defaultMessage="Quarter"
      />
    ),
  },
  {
    id: 'duration_custom_days',
    title: (
      <FormattedMessage
        id="period.custom_days"
        defaultMessage="Custom days"
      />
    ),
  },
  {
    id: 'duration_custom_months',
    title: (
      <FormattedMessage
        id="period.custom_months"
        defaultMessage="Custom months"
      />
    ),
  },
];
