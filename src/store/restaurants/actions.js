export const START_LOADING = 'START_LOADING';
export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';

export const loadRestaurants = () => async (dispatch, getState, api) => {
  dispatch(startLoading());
  const records = await api.loadRestaurants();
  dispatch(storeRestaurants(records));
};

const startLoading = () => ({type: START_LOADING});

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});
