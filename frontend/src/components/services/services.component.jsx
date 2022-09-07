import Show from './show.component';
import Edit from './edit.component';
import Create from './create.component';
import CreateForServices from '../subscriptions/create-for-services.component';
import { default as SubscriptionsIndex } from '../services/client/index.component';
import SubscriptionsTabs from '../subscriptions/tabs/SubscriptionsTabs.component';
import ServicesMainPage from './mainPage/ServicesMainPage.component';

const Services = ({
  controller,
  action,
  id,
  client_id,
  subcontroller,
  ...props
}) => {
  return (
    <>
      {subcontroller === undefined ? (
        <>
          {action === undefined ? (
            <ServicesMainPage {...props} />
          ) : (
            ''
          )}
          {action === 'services_index' && client_id > 0 && (
            <SubscriptionsIndex client_id={client_id} />
          )}
          {/* показываем список услуг в которых есть подписки клиента */}
          {action === 'services_index_client' &&
            client_id > 0 && (
              <SubscriptionsIndex client_id={client_id} />
            )}
          {action === 'show' && id > 0 ? (
            <Show id={id} {...props} />
          ) : (
            ''
          )}
          {action === 'edit' && id > 0 ? (
            <Edit id={id} {...props} />
          ) : (
            ''
          )}
          {action === 'create' ? <Create {...props} /> : ''}
          {/*
            Создание подписки внутри Клиент-> Услуги
            --------------------------------------------------
            Зарегистрированные ссылки на вызов экшена:
            src/components/services/client/MenuItemMonitoring.component.jsx
          */}
          {action === 'subscription_create' ? (
            <CreateForServices
              client_id={client_id}
              {...props}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <SubscriptionsTabs />
      )}
    </>
  );
};

export default Services;
