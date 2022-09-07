import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ReactPaginate from 'react-paginate';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  font12: {
    fontSize: '12px',
  },
}));

const Paginator = ({
  page,
  pages,
  onPageChange,
}) => {
  const classes = useStyles();

  if (pages < 2) {
    return <></>;
  }
  return (
    <ReactPaginate
      previousLabel={
        <ArrowBackIosIcon
          className={classes.font12}
        />
      }
      nextLabel={
        <ArrowForwardIosIcon
          className={classes.font12}
        />
      }
      breakLabel="..."
      forcePage={page - 1}
      breakClassName="break-me"
      activeClassName="active"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      pageCount={pages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={({ selected }) =>
        onPageChange(selected + 1)
      }
      containerClassName={
        'pagination nomargin'
      }
      subContainerClassName={
        'pages pagination'
      }
    />
  );
};

export default Paginator;

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onPageChange:
    PropTypes.func.isRequired,
};
