import messages_ru from '../../translations/ru.json';
import messages_en from '../../translations/en.json';
import { createIntl, createIntlCache } from 'react-intl';

const cache = createIntlCache();
const language =
  localStorage.getItem('lang') || navigator.language.split(/[-_]/)[0];

const messages = {
  ru: messages_ru,
  en: messages_en,
};

const intl = createIntl(
  {
    locale: language,
    defaultLocale: 'en',
    messages: messages[language],
  },
  cache,
);

export const messageI18n = (id, message, params = {}) =>
  intl.formatMessage(
    {
      id: id,
      defaultMessage: message,
    },
    params,
  );
