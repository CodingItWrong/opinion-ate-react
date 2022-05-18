export async function loadRestaurants({
  api,
  setRestaurants,
  setLoading,
  setLoadError,
}) {
  setLoadError(false);
  setLoading(true);
  try {
    const records = await api.loadRestaurants();
    setRestaurants(records);
  } catch {
    setLoadError(true);
  } finally {
    setLoading(false);
  }
}

export async function createRestaurant({
  name,
  api,
  restaurants,
  setRestaurants,
}) {
  const record = await api.createRestaurant(name);
  setRestaurants([...restaurants, record]);
}
