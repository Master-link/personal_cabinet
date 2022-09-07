import React from "react";

const BeautyTicket = ({ type }) => {
  switch (type) {
    case "sms_gate":
      return <>СМС гейт</>;
    case "tech_support":
      return <>Техподдержка</>;
    case "license":
      return <>Сервис с лицензией</>;
    case "calls_bot":
      return <>Голосовой робот</>;
    case "custom":
      return <>Стандартный</>;
    case "taxophone":
      return <>Настройки таксофона</>;
    default:
      return <></>;
  }
};

export default BeautyTicket;
