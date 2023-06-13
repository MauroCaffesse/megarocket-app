import {
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  getSubscriptionsError,
  getByIdSubscriptionsPending,
  getByIdSubscriptionsSuccess,
  getByIdSubscriptionsError,
  addSubscriptionsPending,
  addSubscriptionsSuccess,
  addSubscriptionsError
} from './actions';

export const getSubscriptions = async (dispatch) => {
  dispatch(getSubscriptionsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
    const data = await response.json();
    dispatch(getSubscriptionsSuccess(data.data));
  } catch (error) {
    dispatch(getSubscriptionsError(error.toString()));
  }
};

export const addSubscriptions = async (dispatch, newSubscription) => {
  dispatch(addSubscriptionsPending());
  try {
    const isoDate = newSubscription.date ? new Date(newSubscription.date).toISOString() : '';
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        classes: newSubscription.classes,
        members: newSubscription.members,
        date: isoDate
      })
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`, body);
    const data = await response.json();
    if (response.status === 201) {
      dispatch(addSubscriptionsSuccess(data));
    }
    if (response.status === 400) {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(addSubscriptionsError(error.message));
  }
};
export const getByIdSubscriptions = async (dispatch, id) => {
  dispatch(getByIdSubscriptionsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`);
    const data = await response.json();
    dispatch(getByIdSubscriptionsSuccess(data));
  } catch (error) {
    dispatch(getByIdSubscriptionsError(error.toString()));
  }
};
