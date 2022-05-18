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
