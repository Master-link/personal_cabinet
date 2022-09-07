import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { KindTechSupport } from './KindTechSupport';
import * as PropTypes from 'prop-types';

const extractAndCalculateMinutes = (selectedPackage) => {
  const packageOption = selectedPackage.split(' ');
  return parseInt(packageOption[0]) * 60;
};

const filterPriceValue = (factoryArray, value) => {
  const selectedHour = factoryArray.find(
    (e) => e.id == value,
  );

  if (selectedHour) {
    const splittedHours = selectedHour.name.split(' ');
    return splittedHours[splittedHours.length - 1];
  }

  return 0;
};

export const KindTechSupportContainer = ({
  tariff,
  form,
  readOnly,
}) => {
  const intl = useIntl();

  const [newTariffHours, setNewTariffHours] = useState([]);
  const [newTariffSlas, setNewTariffSlas] = useState([]);
  const [coastPackage, setCoastPackage] = useState(0);
  const [coastSla, setCoastSla] = useState(0);

  const recountCoast = () => {
    if (tariff.extra.new_tariff) {
      form.change('jsondata.new_tariff', true);
      form.change(
        'jsondata.subscribe_price',
        parseFloat(tariff.advance_payment) +
          parseFloat(coastPackage) +
          parseFloat(coastSla),
      );
      const selectedPackage = newTariffHours.find((e) => {
        const splittedHours = e.name.split(' ');
        return (
          splittedHours[splittedHours.length - 1] ==
          coastPackage
        );
      });

      if (selectedPackage) {
        form.change(
          'settings.hours',
          parseInt(tariff.settings.hours) +
            parseInt(
              extractAndCalculateMinutes(
                selectedPackage.name,
              ),
            ),
        );
      }
    } else {
      form.change('jsondata.new_tariff', false);
      form.change('settings.hours', null);
    }
  };

  useEffect(() => {
    // логика нового тарифа
    if (tariff.extra.new_tariff) {
      const allOptionsHours =
        tariff.extra.new_tariff_hours.map(
          (extraTariff) => ({
            name: `${extraTariff.name} ${extraTariff.price}`,
            id: extraTariff.name,
          }),
        );
      // собрать опции пакета часов
      setNewTariffHours(allOptionsHours);

      const allOptionsSlas =
        tariff.extra.new_tariff_slas.map((extraTariff) => ({
          name: `${extraTariff.name} ${extraTariff.price}`,
          id: extraTariff.name,
        }));
      // собрать опции пакета СЛА
      setNewTariffSlas(allOptionsSlas);

      form.change(
        'jsondata.subscribe_price',
        tariff.advance_payment,
      );

      // для перерасчета стоимости
      setCoastPackage(
        filterPriceValue(
          allOptionsHours,
          form.getFieldState('jsondata.new_tariff_hours')
            .value,
        ),
      );

      // для перерасчета стоимости
      setCoastSla(
        filterPriceValue(
          allOptionsSlas,
          form.getFieldState('jsondata.new_tariff_slas')
            .value,
        ),
      );
    }
  }, [tariff]);

  useEffect(() => {
    // перерасчет стоимости
    if (tariff.extra.new_tariff) {
      recountCoast();
    }
  }, [coastPackage, coastSla]);

  return (
    <KindTechSupport
      form={form}
      intl={intl}
      newTariffHours={newTariffHours}
      newTariffSlas={newTariffSlas}
      setCoastPackage={setCoastPackage}
      setCoastSla={setCoastSla}
      filterPriceValue={filterPriceValue}
      tariff={tariff}
      readOnly={readOnly}
    />
  );
};

KindTechSupportContainer.propTypes = {
  form: PropTypes.object.isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
