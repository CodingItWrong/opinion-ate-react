import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function NewRestaurantForm() {
  return (
    <form>
      <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
      <Button variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

export default NewRestaurantForm;
