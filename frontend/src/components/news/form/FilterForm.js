import * as PropTypes from 'prop-types';
import { Toolbar } from 'src/components/_helpers/Toolbar.component';

export const FilterForm = ({
  formButtons,
}) => <Toolbar buttons={formButtons} />;

FilterForm.propTypes = {
  formButtons:
    PropTypes.node.isRequired,
};
