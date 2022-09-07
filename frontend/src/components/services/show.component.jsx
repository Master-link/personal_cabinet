import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CheckedActive from 'src/utilities/checked-active.utility';
import BeautyActive from 'src/utilities/beauty-active.utility';
import BeautyTicket from 'src/utilities/beauty-ticket.utility';
import { getService } from 'src/services/service-http.service';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { FormattedMessage } from 'react-intl';
import {
  setBreadcrumb,
  setActive,
} from 'src/redux/breadcrumbs/breadcrumbs.actions';
import { PermissionsUtility } from 'src/utilities/permissions.utility';
import { EDIT_SERVICE } from 'src/constants/permissions';
import {
  TECH_SUPPORT,
  SMS_GATE,
} from 'src/constants/types';
import { Fragment } from 'react';

//
// Просмотр услуги
// Удаление услуги запрещено, т.к. там много завязано
//
const Show = ({
  id,
  history,
  setActive,
  setBreadcrumb,
}) => {
  const intl = useIntl();
  const [data, setData] = useState(false);

  const fetchData = async (id) => {
    return await getService(id)
      .then((response) => {
        setData(response.data.service);
        return response.data.service;
      })
      .catch(() => {});
  };

  useEffect(() => {
    async function fetch() {
      return await fetchData(id).then((data) => {
        return data;
      });
    }

    fetch().then((response) => {
      setActive('/services');
      setBreadcrumb([
        {
          name: (
            <FormattedMessage
              id="services"
              defaultMessage="Услуги"
            />
          ),
          to: '/services',
        },
        { name: `${response.name}` },
      ]);
    });
  }, []);

  return (
    data && (
      <>
        <div className="panel p_25-1_25-1">
          <div className="subpanel">
            {PermissionsUtility(EDIT_SERVICE) && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push(`/services/edit/${id}`);
                  }}
                >
                  <FormattedMessage
                    id="i18n.edit"
                    defaultMessage="Edit"
                  />
                </Button>
                <Divider variant="middle" flexItem />
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push(
                  `/services/show/${id}/tariffs`,
                );
              }}
            >
              <FormattedMessage
                id="services.tariffs"
                defaultMessage="Tariffs"
              />
            </Button>
          </div>
        </div>

        <Table className="profile">
          <TableHead></TableHead>
          <TableBody>
            <TableRow key="state">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'state',
                  defaultMessage: 'State',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <BeautyActive status={data.state} />
              </TableCell>
            </TableRow>

            <TableRow key="id">
              <TableCell component="th">ID:</TableCell>
              <TableCell align="left">{data.id}</TableCell>
            </TableRow>

            <TableRow key="data.name">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'service',
                  defaultMessage: 'Service',
                })}
                :
              </TableCell>
              <TableCell align="left">
                {data.name}
              </TableCell>
            </TableRow>

            <TableRow key="countries">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'countries',
                  defaultMessage: 'Countries',
                })}
                :
              </TableCell>
              <TableCell align="left">
                {data.countries
                  ? data.countries
                      .map((c) => c.name)
                      .join(', ')
                  : '-'}
              </TableCell>
            </TableRow>

            <TableRow key="currency">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'currency',
                  defaultMessage: 'Currency',
                })}
                :
              </TableCell>
              <TableCell align="left">
                {data.currency.name}
              </TableCell>
            </TableRow>

            <TableRow key="legal_entity">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'urlico',
                  defaultMessage: 'Legal entity',
                })}
                :
              </TableCell>
              <TableCell align="left">
                {data.legal_entity.name}
              </TableCell>
            </TableRow>

            <TableRow key="ticket.kind">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'type',
                  defaultMessage: 'Type',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <BeautyTicket type={data.ticket.kind} />
              </TableCell>
            </TableRow>

            <TableRow key="ticket.lumpsum">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'lumpsum',
                  defaultMessage: 'Lumpsum',
                })}
                :
              </TableCell>
              <TableCell align="left">
                {data.ticket.lumpsum || '-'}
              </TableCell>
            </TableRow>

            <TableRow key="ticket.can_suspend">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'may_be_suspend',
                  defaultMessage:
                    'Subscribe may be suspend',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <CheckedActive
                  status={data.ticket.can_suspend}
                />
              </TableCell>
            </TableRow>

            <TableRow key="ticket.count_balance">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'count_balance',
                  defaultMessage: 'Count balance',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <CheckedActive
                  status={data.ticket.count_balance}
                />
              </TableCell>
            </TableRow>

            <TableRow key="ticket.use_credit">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'use_credit_means',
                  defaultMessage: 'Use credit means',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <CheckedActive
                  status={data.ticket.use_credit}
                />
              </TableCell>
            </TableRow>

            <TableRow key="ticket.count_statistic">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'account_statistics',
                  defaultMessage: 'Account statistics',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <CheckedActive
                  status={data.ticket.count_statistic}
                />
              </TableCell>
            </TableRow>

            <TableRow key="ticket.allow_subscribe">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'allow_clients_subscribe_service',
                  defaultMessage:
                    'Allow clients subscribe service',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <CheckedActive
                  status={data.ticket.allow_subscribe}
                />
              </TableCell>
            </TableRow>

            <TableRow key="ticket.require_submit_client">
              <TableCell component="th">
                {intl.formatMessage({
                  id:
                    'require_manager_confirm_to_subscribe_client',
                  defaultMessage:
                    'Require manager confirm to allow subscribe',
                })}
                :
              </TableCell>
              <TableCell align="left">
                <CheckedActive
                  status={data.ticket.require_submit_client}
                />
              </TableCell>
            </TableRow>

            <TableRow key="alert_template_email">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'pattern.email_notofications',
                  defaultMessage:
                    'Email pattern for notifications',
                })}
                :
              </TableCell>
              <TableCell
                align="left"
                dangerouslySetInnerHTML={{
                  __html: data.alert_template_email,
                }}
              ></TableCell>
            </TableRow>

            <TableRow key="alert_template_sms">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'pattern.sms_notofications',
                  defaultMessage:
                    'Sms pattern for notifications',
                })}
                :
              </TableCell>
              <TableCell
                align="left"
                dangerouslySetInnerHTML={{
                  __html: data.alert_template_sms,
                }}
              ></TableCell>
            </TableRow>

            <TableRow key="ticket.description">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'pg.description',
                  defaultMessage: 'Description',
                })}
                :
              </TableCell>
              <TableCell
                align="left"
                dangerouslySetInnerHTML={{
                  __html: data.ticket.description,
                }}
              ></TableCell>
            </TableRow>

            <TableRow key="ticket.agreement">
              <TableCell component="th">
                {intl.formatMessage({
                  id: 'claim.agreement',
                  defaultMessage: 'Claim agreement',
                })}
                :
              </TableCell>
              <TableCell
                align="left"
                dangerouslySetInnerHTML={{
                  __html: data.agreement,
                }}
              ></TableCell>
            </TableRow>

            {data.ticket.kind === SMS_GATE && (
              <Fragment>
                <TableRow key="alert_sms_smpp">
                  <TableCell component="th">
                    Шаблон SMS уведомлений по отсутствию
                    авторизации SMPP логина:
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html: data.ticket.alert_sms_smpp,
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow key="alert_email_smpp">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id: 'pattern.email_no_auth_smpp',
                      defaultMessage:
                        'Email pattern no auth SMPP',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html: data.ticket.alert_email_smpp,
                    }}
                  ></TableCell>
                </TableRow>
              </Fragment>
            )}

            {data.ticket.kind === TECH_SUPPORT && (
              <Fragment>
                <TableRow key="tms_finish_subscribe_sms">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id:
                        'pattern.sms_notofications_expired_subscribe',
                      defaultMessage:
                        'Sms pattern on expired subscribe',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html:
                        data.ticket
                          .tms_finish_subscribe_sms,
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow key="tms_finish_subscribe_email">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id:
                        'pattern.email_notofications_expired_subscribe',
                      defaultMessage:
                        'Email pattern on expired subscribe',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html:
                        data.ticket
                          .tms_finish_subscribe_email,
                    }}
                  ></TableCell>
                </TableRow>

                <TableRow key="tms_tmserver_sms">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id:
                        'pattern.sms_notofications_accessible_tms',
                      defaultMessage:
                        'Sms pattern on accessible TMS server',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html: data.ticket.tms_tmserver_sms,
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow key="tms_tmserver_email">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id:
                        'pattern.email_notofications_accessible_tms',
                      defaultMessage:
                        'Email pattern on accessible TMS server',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html:
                        data.ticket.tms_tmserver_email,
                    }}
                  ></TableCell>
                </TableRow>

                <TableRow key="tms_backup_sms">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id:
                        'pattern.sms_notofications_last_backup',
                      defaultMessage:
                        'Sms pattern for notifications about last backup',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html: data.ticket.tms_backup_sms,
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow key="tms_backup_email">
                  <TableCell component="th">
                    {intl.formatMessage({
                      id:
                        'pattern.email_notofications_last_backup',
                      defaultMessage:
                        'Email pattern for notifications about last backup',
                    })}
                    :
                  </TableCell>
                  <TableCell
                    align="left"
                    dangerouslySetInnerHTML={{
                      __html: data.ticket.tms_backup_email,
                    }}
                  ></TableCell>
                </TableRow>
              </Fragment>
            )}
          </TableBody>
        </Table>
      </>
    )
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: (data) => dispatch(setBreadcrumb(data)),
    setActive: (active) => dispatch(setActive(active)),
  };
};

export default connect(null, mapDispatchToProps)(Show);

Show.propTypes = {
  id: PropTypes.number,
  history: PropTypes.object.isRequired,
  setActive: PropTypes.func.isRequired,
  setBreadcrumb: PropTypes.func.isRequired,
};
