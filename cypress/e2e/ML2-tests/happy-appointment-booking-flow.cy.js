describe("Happy Path: User signs up, logs in, selects a profession and books an appointment", () => {
  it("allows a user to sign up, log in, browse professions and book an appointment", () => {
    // Register a new user

    cy.visit("/register");

    const randomId = Cypress._.random(10000, 99999);
    const username = `TestUser${randomId}`;
    const email = `testuser${randomId}@test.com`;

    cy.get('[data-test="register-username"]').type(username);
    cy.get('[data-test="register-email"]').type(email);
    cy.get('[data-test="register-password"]').type("123456789");
    cy.get('[data-test="register-btn"]').click();

    cy.contains(
      "Registration successful! Please check your email to verify your account.",
      { timeout: 15000 }
    ).should("be.visible");

    // Visit login page

    cy.visit("/login");

    // Log in

    cy.get('[data-test="login-identifier"]').type(email);
    cy.get('[data-test="login-password"]').type("123456789");
    cy.get('[data-test="login-btn"]').click();

    // After login -> redirect to home

    cy.url().should("include", "/home");
    cy.window().then((win) => {
      const jwt = win.sessionStorage.getItem("jwt");
      expect(jwt).to.exist;
      cy.wrap(jwt).as("jwt");
    });
    cy.get('[data-test="search-bar"]', { timeout: 15000 }).should("be.visible");

    // SELECT A PROFESSION

    cy.get('[data-test="profession-card-1"]').contains("Electrician").click();
    cy.url().should("include", "/profession/Electrician");

    // VIEW A PROFESSIONAL'S CALENDAR

    cy.get('[data-test="professional-card-0"]').click();

    cy.url().should("include", "/calendar");
    cy.contains("Availability").should("be.visible");

    cy.on("window:confirm", () => true);

    cy.get("[data-test='calendar-slot']").last().click();

    cy.contains("Appointment booked successfully!", { timeout: 15000 }).should(
      "be.visible"
    );
  });
});
