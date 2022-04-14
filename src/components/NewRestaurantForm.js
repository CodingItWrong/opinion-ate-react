import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const NewRestaurantForm = ({createRestaurant}) => {
  const handleSubmit = e => {
    e.preventDefault();
    createRestaurant();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="new-restaurant-submit-button"
      >
        Add
      </Button>
    </form>
  );
};

export default NewRestaurantForm;
