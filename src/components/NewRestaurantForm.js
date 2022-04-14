import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const NewRestaurantForm = () => {
  return (
    <form>
      <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
      <Button
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
