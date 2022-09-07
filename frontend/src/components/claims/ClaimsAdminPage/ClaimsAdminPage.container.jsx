import { useEffect, useState } from 'react';
import { breadcrumbsIndexClaims } from '../index';
import { connect, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useIntl } from 'react-intl';
import { getClaims } from 'src/services/claim-http.service';
import { useHistory } from 'react-router-dom';
import { LIMIT } from 'src/constants/tableParams';
import { useLocation } from 'react-router-dom';
import { ClaimsAdminPage } from 'src/components/claims/ClaimsAdminPage/ClaimsAdminPage';
import {
  resetClaim,
  setClaimClaims,
} from 'src/redux/claim/claim.actions';
import * as PropTypes from 'prop-types';

const ClaimsAdminPageContainer = ({
  claimClaims,
  setClaimClaims,
}) => {
  const query = new URLSearchParams(useLocation().search);
  const intl = useIntl();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const location = useLocation();
  const search = query.get('search');

  const {
    total,
    data,
    currentPageNumber,
    sort,
    order,
    status,
  } = claimClaims;

  const [disabled, setDisabled] = useState(true);

  const fetchData = () => {
    setDisabled(false);
    getClaims(
      {
        page: currentPageNumber,
        sort,
        order,
        limit: LIMIT,
      },
      {
        state: status,
      },
    )
      .then((response) => {
        const {
          data: {
            meta: { total_pages: total },
            data,
          },
        } = response;
        setClaimClaims({
          ...claimClaims,
          status: search || 'null',
          data,
          total,
        });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      })
      .finally(() => setDisabled(true));
  };

  const handleThClick = (sort) => {
    const sortDirection = order === `asc` ? `desc` : `asc`;
    setClaimClaims({
      ...claimClaims,
      sort,
      order: sortDirection,
    });
  };

  const paginationProps = {
    rowsPerPageOptions: [],
    component: 'div',
    count: total * LIMIT,
    rowsPerPage: LIMIT,
    page: currentPageNumber - 1,
    onChangePage: (_event, page) => {
      setClaimClaims({
        ...claimClaims,
        currentPageNumber: page + 1,
      });
    },
  };

  useEffect(() => {
    breadcrumbsIndexClaims(dispatch);
  }, []);

  useEffect(() => {
    fetchData();
  }, [location.search, currentPageNumber, order, sort]);

  return (
    <ClaimsAdminPage
      total={total}
      data={data}
      currentPageNumber={currentPageNumber}
      sort={sort}
      order={order}
      status={status}
      disabled={disabled}
      intl={intl}
      history={history}
      claimClaims={claimClaims}
      setClaimClaims={setClaimClaims}
      paginationProps={paginationProps}
      handleThClick={handleThClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    claimClaims: state.claim.claims,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClaimClaims: (data) =>
      dispatch(setClaimClaims(data)),
    resetClaim: () => dispatch(resetClaim()),
  };
};

ClaimsAdminPage.propTypes = {
  claimClaims: PropTypes.shape({
    total: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        client: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          crm: PropTypes.string.isRequired,
        }),
        comment: PropTypes.string,
        created_at: PropTypes.string.isRequired,
        date_activation: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        service: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        state: PropTypes.string.isRequired,
        tariff: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      }),
    ).isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    sort: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  setClaimClaims: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClaimsAdminPageContainer);
