import BreadcrumbsTypes from './breadcrumbs.types';
const INITIAL_STATE = {
  data: [],
  active: '',
};

const breadcrumbsRuducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case BreadcrumbsTypes.SET_BREADCRUMB_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case BreadcrumbsTypes.SET_BREADCRUMB_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case BreadcrumbsTypes.SET_COMBINE_REDUX:
      return {
        ...state,
        active: action.payload.active,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default breadcrumbsRuducer;
