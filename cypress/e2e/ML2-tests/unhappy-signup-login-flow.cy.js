describe("Unhappy Path: User fails to log in with invalid password", () => {
  it("prevents login when the password is incorrect", () => {
    // Visit the register page

    cy.visit("/register");

    const randomId = Cypress._.random(10000, 99999);
    const username = `TestUser${randomId}`;
    const email = `testuser${randomId}@test.com`;

    // Fill in registration form
    cy.get('[data-test="register-username"]').type(username);
    cy.get('[data-test="register-email"]').type(email);
    cy.get('[data-test="register-password"]').type("correctpassword");
    cy.get('[data-test="register-btn"]').click();

    // Confirm registration success
    cy.contains(
      "Registration successful! Please check your email to verify your account."
    ).should("be.visible");
    
    // Visit the login page

    // Attempt to log in with wrong password
    cy.visit("/login");
    cy.get('[data-test="login-identifier"]').type(email);
    cy.get('[data-test="login-password"]').type("wrongpassword");
    cy.get('[data-test="login-btn"]').click();

    // Assert that error message appears
    cy.contains("Invalid credentials").should("be.visible");

    // Assert user is not redirected to home
    cy.url().should("not.include", "/home");
  });
});
