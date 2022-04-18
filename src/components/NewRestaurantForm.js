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

export const NewRestaurantForm = ({createRestaurant}) => {
  const [state, setState] = useState({
    name: '',
    validationError: false,
    serverError: false,
  });

  const handleChange = e => {
    setState(state => ({
      ...state,
      name: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (state.name) {
      setState(state => ({
        ...state,
        validationError: false,
        serverError: false,
      }));
      createRestaurant(state.name)
        .then(() => {
          setState(state => ({
            ...state,
            name: '',
          }));
        })
        .catch(() => {
          setState(state => ({
            ...state,
            serverError: true,
          }));
        });
    } else {
      setState(state => ({
        ...state,
        validationError: true,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {state.serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      {state.validationError && (
        <Alert severity="error">Name is required</Alert>
      )}
      <TextField
        value={state.name}
        onChange={handleChange}
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
};

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
