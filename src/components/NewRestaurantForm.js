import TextField from '@material-ui/core/TextField';

export const NewRestaurantForm = () => {
  return (
    <form>
      <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
    </form>
  );
};

export default NewRestaurantForm;
