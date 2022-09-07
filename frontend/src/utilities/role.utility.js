import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import { allUserRoles } from 'src/constants/allUserRoles';

const Role = ({ userRoles }) => {
  const lastRoleIndex = userRoles.length - 1;
  return (
    <div>
      {userRoles.map((role, index) => (
        <span className="pr-2" key={index}>
          <FormattedMessage
            id={`role.${role.name}`}
            defaultMessage={allUserRoles[role.name]}
          />
          {lastRoleIndex !== index && ', '}
        </span>
      ))}
    </div>
  );
};

export default Role;

Role.propTypes = {
  userRoles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
