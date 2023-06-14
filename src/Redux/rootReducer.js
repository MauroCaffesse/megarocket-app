import { combineReducers } from 'redux';
import subscriptionReducer from '../Redux/Subscriptions/reducers';

// Import reducers below
import toastReducer from './Shared/ResponseToast/reducer';
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';
import subscriptionsReducer from './Subscriptions/reducers';

const rootReducers = combineReducers({
  activity: activititesReducer,
  subscription: subscriptionReducer,
  toast: toastReducer,
  classes: classReducer,
  members: membersReducer,
  subscriptions: subscriptionsReducer,
  trainers: trainersReducer
});

export default rootReducers;
