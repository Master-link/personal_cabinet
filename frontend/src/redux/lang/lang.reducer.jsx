import LangTypes from './lang.types';
const INITIAL_STATE = {
  data: [],
  active: ''
}

const breadcrumbsRuducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case LangTypes.SET_LANG_DATA:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}

export default breadcrumbsRuducer;