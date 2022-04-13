export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';

export const loadRestaurants = () => (dispatch, getState, api) => {
  api.loadRestaurants().then(records => {
    dispatch(storeRestaurants(records));
  });
};

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});
