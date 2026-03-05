describe('Withdraw retry flow', () => {
  it('retries failed requests and succeeds', () => {
    let callCount = 0;

    cy.intercept('POST', '**/withdrawals', (req) => {
      callCount++;

      if (callCount < 3) {
        req.reply({ statusCode: 500 });
      } else {
        req.reply({
          statusCode: 201,
          body: { id: 'retry123' },
        });
      }
    }).as('postWithdraw');

    cy.visit('http://localhost:3000');

    cy.get('#amount').type('150');
    cy.get('#destination').type('0xRetryAddress');
    cy.get('input[type=checkbox]').check();

    cy.contains('Submit').click();

    cy.wait('@postWithdraw');
    cy.wait('@postWithdraw');
    cy.wait('@postWithdraw');

    cy.contains('retry123').should('exist');
  });
});

describe('Withdraw restore after reload', () => {
  it('restores last withdrawal if within 5 minutes', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'lastWithdrawal',
          JSON.stringify({
            id: 'restore123',
            status: 'pending',
            amount: 200,
            destination: '0xRestore',
            timestamp: Date.now(),
          }),
        );
      },
    });

    cy.get('#amount').should('have.value', '200');
    cy.get('#destination').should('have.value', '0xRestore');
  });
});
