import { useParams } from 'react-router-dom';
import ShowTabs from './ShowTabs.component';

const Tabs = () => {
  const {
    controller,
    client_id,
    action,
    id,
    subcontroller,
  } = useParams();
  if (action !== undefined) {
    return (
      <>
        <ShowTabs
          controller={controller}
          action={controller + '_' + action}
          client_id={client_id}
          id={id}
          subcontroller={subcontroller}
        />
      </>
    );
  } else {
    return (
      <>
        <ShowTabs
          controller={controller}
          action={controller + '_index'}
          client_id={client_id}
          id={id}
        />
      </>
    );
  }
};

export default Tabs;
