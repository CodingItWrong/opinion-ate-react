import {useState} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {createRestaurant} from '../store/restaurants/actions';

export function handleCreate({state, updateState, createRestaurant}) {
  if (!state.name) {
    updateState({
      validationError: true,
      serverError: false,
    });
    return;
  }

  updateState({
    validationError: false,
    serverError: false,
  });

  createRestaurant(state.name)
    .then(() => {
      // not persistent state; not following the state paradigm
      // think through the simplest way to do this as a standalone function
      updateState({name: ''});
    })
    .catch(() => {
      updateState({
        serverError: true,
      });
    });
}

export function NewRestaurantFormDisplay({
  name,
  setName,
  validationError,
  serverError,
  onSubmit,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      {validationError && <Alert severity="error">Name is required</Alert>}
      <TextField
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
      />
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
}

export const NewRestaurantForm = ({createRestaurant}) => {
  const [state, setState] = useState({
    name: '',
    validationError: false,
    serverError: false,
  });

  const setName = newName => {
    setState(state => ({
      ...state,
      name: newName,
    }));
  };

  const handleSubmit = () => {
    function updateState(changes) {
      setState(state => ({
        ...state,
        ...changes,
      }));
    }

    handleCreate({state, updateState, createRestaurant});
  };

  return (
    <NewRestaurantFormDisplay
      name={state.name}
      setName={setName}
      validationError={state.validationError}
      serverError={state.serverError}
      onSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
