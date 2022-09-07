import ClaimTypes from './claim.types';
import { ORDER } from 'src/constants/tableParams';
const INITIAL_STATE = {
  count: 1,
  data: {
    serviceData: { id: null, name: null },
    tariffData: { id: null, name: null },
    tariff: null,
    agreement: false,
    serviceOptions: [],
    tariffOptions: [],
    disabledSubmit: false,
  },
  claims: {
    total: 0,
    data: [],
    currentPageNumber: 1,
    sort: 'id',
    order: ORDER,
    status: '',
  },
};

const claimRuducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClaimTypes.SET_CLAIM_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ClaimTypes.SET_CLAIM_CLAIMS:
      return {
        ...state,
        claims: action.payload,
      };
    case ClaimTypes.SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case ClaimTypes.RESET_CLAIM:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default claimRuducer;
