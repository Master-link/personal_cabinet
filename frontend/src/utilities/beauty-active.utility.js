const BeautyActive = ({ status }) => {
  switch (status) {
    case 'state_new':
      return <>Новый</>;
    case 'active':
    case 'state_active':
      return <>Активен</>;
    case 'state_limited':
      return <>Ограничена</>;
    case 'state_suspend':
      return <>Приостановлен</>;
    case 'state_approved':
      return <>Одобрено</>;
    case 'state_refused':
      return <>Отклонено</>;
    case 'state_continue':
      return <>Автопродление по тарифу</>;
    case 'closed':
    case 'state_closed':
      return <>Закрыт</>;

    default:
      return <></>;
  }
};

export default BeautyActive;
