import Show from './show.component';

const Profiles = ({ action }) => {
  return <>{action === 'show' && <Show />}</>;
};

export default Profiles;
