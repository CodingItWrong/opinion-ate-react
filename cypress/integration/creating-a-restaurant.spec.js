describe('Creating a Restaurant', () => {
  it('allows adding restaurants', () => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';

    cy.intercept('GET', 'https://api.outsidein.dev/*/restaurants', []);

    cy.intercept('POST', 'https://api.outsidein.dev/*/restaurants', {
      id: restaurantId,
      name: restaurantName,
    }).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant').its('request.body').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
