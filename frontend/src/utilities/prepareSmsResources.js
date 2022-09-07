export const prepareSmsResources = (tariff) => {
  let operatorSms = [];
  if (tariff && tariff.opsms_attributes) {
    tariff.opsms_attributes.forEach((opSms) => {
      operatorSms.push({
        operator_id: opSms.operator_id,
        limit: opSms.limit,
        price: opSms.price,
      });
    });
  }
  return operatorSms;
};
