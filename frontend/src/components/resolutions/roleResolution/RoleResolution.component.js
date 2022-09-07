import { RoleResolution } from './RoleResolution';
import { useEffect, useState } from 'react';
import {
  getResolutions,
  putResolutions,
} from '../../../services/resolution-http.service';
import Myspinner from '../../share/myspinner.component';
import { useHistory, useLocation } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { generateUrlSearchPath } from '../../../utilities/generateUrlSearchPath';
import { LIMIT } from '../../../constants/tableParams';

const RoleResolutionComponent = ({ role }) => {
  const history = useHistory();
  const locationSearch = useLocation().search;
  const query = new URLSearchParams(locationSearch);
  const [loaded, setLoaded] = useState(false);
  const [resolutions, setResolutions] = useState([]);
  const [pages, setPages] = useState(1);

  const page = query.get('page') || 1;
  const sort = query.get('sort') || 'id';
  const order = query.get('order') || 'desc';

  const fetchResolutions = async () => {
    setLoaded(false);
    try {
      const {
        data: {
          data,
          meta: { total_pages },
        },
      } = await getResolutions(
        {
          page: page,
          sort: sort,
          order: order,
        },
        {
          role: role,
        },
      );
      setResolutions(data);
      setPages(total_pages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const saveResolutions = async ({ data }) => {
    setLoaded(false);
    try {
      await putResolutions({
        resolution: { role: role, data: data },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: pages * LIMIT,
    rowsPerPage: LIMIT,
    page: page - 1,
    onChangePage: (_event, page) => {
      const newLink = {
        pathname: '/resolutions',
        search: generateUrlSearchPath({
          page: page + 1,
          sort,
          order,
        }),
      };
      history.push(newLink);
    },
  };

  useEffect(async () => {
    await fetchResolutions();
  }, [page, sort, order]);

  useEffect(async () => {
    history.push('/resolutions');
  }, []);

  return (
    <>
      {!loaded && <Myspinner />}
      <RoleResolution
        role={role}
        data={resolutions}
        pages={pages}
        page={page}
        sort={sort}
        order={order}
        onSubmitForm={(values) => saveResolutions(values)}
        paginationProps={paginationProps}
      />
    </>
  );
};

RoleResolutionComponent.propTypes = {
  role: PropTypes.string.isRequired,
};

export default RoleResolutionComponent;
