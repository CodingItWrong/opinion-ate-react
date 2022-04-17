import {mount} from '@cypress/react';
import {NewRestaurantForm} from '../NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';

  let createRestaurant;

  beforeEach(() => {
    createRestaurant = cy.stub();
    mount(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });

  describe('initially', () => {
    it('does not display a validation error', () => {
      cy.get('[data-test="validation-error"]').should('not.exist');
    });

    it('does not display a server error', () => {
      cy.get('[data-test="server-error"]').should('not.exist');
    });
  });

  describe('when filled in', () => {
    beforeEach(() => {
      createRestaurant.resolves();

      cy.get('[data-test="name-field"]').type(restaurantName);
      cy.get('[data-testid="new-restaurant-submit-button"]').click();
    });

    it('calls createRestaurant with the name', () => {
      expect(createRestaurant).to.be.calledWith(restaurantName);
    });

    it('clears the name', () => {
      cy.get('[data-test="name-field"]').should('have.value', '');
    });

    it('does not display a validation error', () => {
      cy.get('[data-test="validation-error"]').should('not.exist');
    });

    it('does not display a server error', () => {
      cy.get('[data-test="server-error"]').should('not.exist');
    });
  });

  describe('when empty', () => {
    beforeEach(() => {
      createRestaurant.resolves();

      cy.get('[data-testid="new-restaurant-submit-button"]').click();
    });

    it('displays a validation error', () => {
      cy.get('[data-test="validation-error"]').contains(requiredError);
    });

    it('does not call createRestaurant', () => {
      expect(createRestaurant.callCount).to.equal(0);
    });
  });

  describe('when correcting a validation error', () => {
    beforeEach(() => {
      createRestaurant.resolves();

      cy.get('[data-testid="new-restaurant-submit-button"]').click();

      cy.get('[data-test="name-field"]').type(restaurantName);
      cy.get('[data-testid="new-restaurant-submit-button"]').click();
    });

    it('clears the validation error', () => {
      cy.get('[data-test="validation-error"]').should('not.exist');
    });
  });

  describe('when the store action rejects', () => {
    beforeEach(() => {
      createRestaurant.rejects();

      cy.get('[data-test="name-field"]').type(restaurantName);
      cy.get('[data-testid="new-restaurant-submit-button"]').click();
    });

    it('displays a server error', () => {
      cy.get('[data-test="server-error"]').contains(serverError);
    });

    it('does not clear the name', () => {
      // TODO: why is this failing?
      cy.get('[data-test="name-field"]').should('have.value', restaurantName);
    });
  });

  describe('when retrying after a server error', () => {
    beforeEach(() => {
      createRestaurant.onFirstCall().rejects().onSecondCall().resolves();

      cy.get('[data-test="name-field"]').type(restaurantName);
      cy.get('[data-testid="new-restaurant-submit-button"]').click();

      cy.get('[data-test="server-error"]').contains(serverError);

      cy.get('[data-testid="new-restaurant-submit-button"]').click();
    });

    it('clears the server error', () => {
      cy.get('[data-test="server-error"]').should('not.exist');
    });
  });
});
