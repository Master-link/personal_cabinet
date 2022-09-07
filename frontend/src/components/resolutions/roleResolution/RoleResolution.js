import { Tr } from './Tr.component';
import { thResolutions } from './thResolutions';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';

export const RoleResolution = ({
  data,
  onSubmitForm,
  order,
  sort,
  paginationProps,
}) => (
  <Form
    onSubmit={(values) => onSubmitForm(values)}
    mutators={{
      ...arrayMutators,
    }}
    initialValues={{ data: data }}
    render={({ handleSubmit, submitting, values }) => {
      return (
        <form>
          <div className={cn('flexbox', 'ml-2', 'mr-2')}>
            <div
              className={cn(
                'flex-container',
                'mt-2',
                'mb-1',
              )}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                <FormattedMessage
                  id="save"
                  defaultMessage="Save"
                />
              </Button>
            </div>

            <div
              className={cn(
                'flex-container',
                'mt-2',
                'mb-2',
              )}
            >
              <TablePagination {...paginationProps} />
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
                    {thResolutions.map((item, index) => (
                      <RenderThMaterial
                        key={index}
                        sort={sort}
                        thSort={item.sort}
                        onClick={() => {}}
                        order={order}
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
                  <FieldArray name="data">
                    {({ fields }) =>
                      fields.map((data, index) => {
                        const {
                          name,
                          comment,
                          condition,
                        } = values.data[index];
                        return (
                          <Tr
                            key={index}
                            finalFormNamePrefix={data}
                            name={name}
                            comment={comment}
                            condition={condition}
                            index={index}
                          />
                        );
                      })
                    }
                  </FieldArray>
                </TableBody>
              </Table>

              <TablePagination {...paginationProps} />
            </TableContainer>
          </Paper>
        </form>
      );
    }}
  />
);

RoleResolution.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string.isRequired,
      condition: PropTypes.string.isRequired,
      enabled: PropTypes.bool.isRequired,
      has_resolution: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  paginationProps: PropTypes.shape({
    component: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    rowsPerPageOptions: PropTypes.array.isRequired,
  }).isRequired,
  sort: PropTypes.string.isRequired,
};
