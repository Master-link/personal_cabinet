import * as PropTypes from 'prop-types';
import { Toolbar } from 'src/components/_helpers/Toolbar.component';

export const PanelForm = ({ formButtons }) => (
  <Toolbar buttons={formButtons} />
);

PanelForm.propTypes = {
  formButtons: PropTypes.node.isRequired,
};
