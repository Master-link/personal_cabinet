import balanceReducer from './balance/balance.reducer';
import breadcrumbsReducer from './breadcrumbs/breadcrumbs.reducer';
import claimRuducer from './claim/claim.reducer';
import clientReducer from './client/client.reducer';
import documentReducer from './document/document.reducer';
import langReducer from './lang/lang.reducer';
import profileRuducer from './profile/profile.reducer';
import serviceReducer from './service/service.reducer';
import smsloginRuducer from './smslogin/smslogin.reducer';
import subscriptionReducer from './subscription/subscription.reducer';
import tariffReducer from './tariff/tariff.reducer';
import transactionReducer from './transaction/transaction.reducer';
import userReducer from './user/user.reducer';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { notificationReducer } from './notification/notification.reducer';

export default combineReducers({
  balances: balanceReducer,
  breadcrumbs: breadcrumbsReducer,
  claim: claimRuducer,
  client: clientReducer,
  document: documentReducer,
  form: reduxFormReducer,
  lang: langReducer,
  notification: notificationReducer,
  profile: profileRuducer,
  service: serviceReducer,
  smslogin: smsloginRuducer,
  subscription: subscriptionReducer,
  tariff: tariffReducer,
  transaction: transactionReducer,
  user: userReducer,
});
