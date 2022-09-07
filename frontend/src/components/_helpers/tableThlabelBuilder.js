import { FormattedMessage } from 'react-intl';

export const tableThlabelBuilder = (
  noFormat,
  defaultMessage,
  id,
) => {
  if (noFormat) return defaultMessage;

  return (
    <FormattedMessage
      id={id}
      defaultMessage={defaultMessage}
    />
  );
};
