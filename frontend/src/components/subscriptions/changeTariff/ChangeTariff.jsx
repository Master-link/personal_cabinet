import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import cn from 'classnames';
import ChangeTariffDialogContainer from '../changeTariffDialog/ChangeTariffDialog.container';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { thChangeTariff } from './thChangeTariff';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { Tr } from './Tr.component';
import * as PropTypes from 'prop-types';

const ChangeTariff = ({
  data,
  fetchChangeTariffsQueue,
  setCurrentState,
  setShowDialogActionChoose,
}) => (
  <>
    <div className={cn('flexbox', 'ml-2', 'mr-2')}>
      <div className={cn('flex-container', 'mt-2', 'mb-1')}>
        <ChangeTariffDialogContainer
          fetchChangeTariffsQueue={fetchChangeTariffsQueue}
        />
      </div>
    </div>

    <Paper>
      <TableContainer>
        <Table
          size="medium"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {thChangeTariff.map((item, index) => (
                <RenderThMaterial
                  key={index}
                  sort={''}
                  thSort={item.sort}
                  onClick={() => {}}
                  order={''}
                  id={item.id}
                  defaultMessage={item.defaultMessage}
                  label={tableThlabelBuilder(
                    item.noFormat,
                    item.defaultMessage,
                    item.id,
                  )}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(
              (
                {
                  id,
                  finished_at,
                  result: { result },
                  started_at,
                  state,
                },
                index,
              ) => {
                return (
                  <Tr
                    key={index}
                    id={id}
                    result={result}
                    finished_at={finished_at}
                    started_at={started_at}
                    state={state}
                    setShowDialogActionChoose={
                      setShowDialogActionChoose
                    }
                    setCurrentState={setCurrentState}
                  />
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
);

ChangeTariff.propTypes = {
  data: PropTypes.shape({
    finished_at: PropTypes.string.isRequired,
    result: PropTypes.shape({
      result: PropTypes.string.isRequired,
    }).isRequired,
    started_at: PropTypes.string.isRequired,
  }).isRequired,
  fetchChangeTariffsQueue: PropTypes.func.isRequired,
  setCurrentState: PropTypes.func.isRequired,
  setShowDialogActionChoose: PropTypes.func.isRequired,
};

export default ChangeTariff;
