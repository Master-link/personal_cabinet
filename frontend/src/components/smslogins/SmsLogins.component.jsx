import { useEffect, useState } from 'react';
import { Tr } from './Tr.component';
import { getData } from '../../services/smslogin-http.service';
import Myspinner from '../share/myspinner.component';
import { useDispatch } from 'react-redux';
import { thHeader } from './thHeader';
import { breadcrumbsSmsLogins } from './breadcrumbsSmsLogins';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../_helpers/tableThlabelBuilder';

const SmsLogins = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  const [smsLogins, setSmsLogins] = useState([]);

  const fetchSmsLogins = async () => {
    try {
      setLoaded(false);
      const {
        data: { smslogins },
      } = await getData();
      setSmsLogins(smslogins);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(async () => {
    await fetchSmsLogins();
    breadcrumbsSmsLogins(dispatch);
  }, []);

  if (!loaded) {
    return <Myspinner />;
  }

  return (
    <Paper>
      <TableContainer>
        <Table
          size="medium"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {thHeader.map((item, index) => (
                <RenderThMaterial
                  sort={''}
                  thSort={item.sort}
                  onClick={() => {}}
                  order={''}
                  id={item.id}
                  sortDirection={''}
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
            {smsLogins.map(
              ({ id, login, smpp_address_uri }, index) => (
                <Tr
                  key={index}
                  id={id}
                  login={login}
                  smpp_address_uri={smpp_address_uri}
                />
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SmsLogins;
