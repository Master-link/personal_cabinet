import DocumentTypes from './document.types.js';
const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: null,
  client_id: null,
  add: false, // свойство, что добавили новый документ
  needUpdate: false,
};

const documentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DocumentTypes.SET_DOCUMENT_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_ID:
      return {
        ...state,
        id: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_ACTION:
      return {
        ...state,
        action: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_CLIENT_ID_ACTION:
      return {
        ...state,
        client_id: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_RECORD:
      return {
        ...state,
        record: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_ADD:
      return {
        ...state,
        add: action.payload,
      };
    case DocumentTypes.SET_DOCUMENT_NEEDUPDATE:
      return {
        ...state,
        needUpdate: action.payload,
      };
    case DocumentTypes.RESET_DOCUMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default documentReducer;
