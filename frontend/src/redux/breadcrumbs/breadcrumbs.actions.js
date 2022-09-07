import BreadcrumbsTypes from './breadcrumbs.types';

export const setBreadcrumb = (data) => ({
  type: BreadcrumbsTypes.SET_BREADCRUMB_DATA,
  payload: data,
});
export const setActive = (active) => ({
  type: BreadcrumbsTypes.SET_BREADCRUMB_ACTIVE,
  payload: active,
});
export const setCombineRedux = (payload) => ({
  type: BreadcrumbsTypes.SET_COMBINE_REDUX,
  payload: payload,
});
