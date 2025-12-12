describe("Unhappy Path: User fails to log in with invalid password", () => {
  it("prevents login when the password is incorrect", () => {
    // Visit the register page
    cy.visit("/register");

    // Fill in registration form
    cy.get('[data-test="register-username"]').type("Jane Test");
    cy.get('[data-test="register-email"]').type("jane@test.com");
    cy.get('[data-test="register-password"]').type("correctpassword");
    cy.get('[data-test="register-btn"]').click();

    // Confirm registration success
    cy.contains(
      "Registration successful! Please check your email to verify your account."
    ).should("be.visible");

    // Auto-verify via test endpoint
    cy.request("POST", "http://localhost:8080/api/test/auto-verify", {
      email: "jane@test.com",
    });

    // Attempt to log in with wrong password
    cy.visit("/login");
    cy.get('[data-test="login-identifier"]').type("jane@test.com");
    cy.get('[data-test="login-password"]').type("wrongpassword");
    cy.get('[data-test="login-btn"]').click();

    // Assert that error message appears
    cy.contains("Invalid credentials").should("be.visible");

    // Assert user is not redirected to home
    cy.url().should("not.include", "/home");
  });
});