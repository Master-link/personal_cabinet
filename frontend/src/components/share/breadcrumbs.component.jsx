import { default as MaterialBreadcrumbs } from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Breadcrumbs = ({ breadcrumbs }) => (
  <MaterialBreadcrumbs maxItems={3}>
    {breadcrumbs.map((breadcrumb, index) =>
      breadcrumb.to === undefined ? (
        <>{breadcrumb.name}</>
      ) : (
        <Link key={`bl-${index}`} to={breadcrumb.to}>
          {breadcrumb.name}
        </Link>
      ),
    )}
  </MaterialBreadcrumbs>
);

const mapStateToProps = (state) => {
  return {
    breadcrumbs: state.breadcrumbs.data,
  };
};

export default connect(mapStateToProps)(Breadcrumbs);
