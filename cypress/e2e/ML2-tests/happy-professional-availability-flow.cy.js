describe("Professional availability flow", () => {
  before(() => {
    // Start at register page

    cy.visit("/register");

    const randomId = Cypress._.random(10000, 99999);
    const username = `TestUser${randomId}`;
    const email = `testuser${randomId}@test.com`;

    cy.get('[data-test="register-username"]').type(username);
    cy.get('[data-test="register-email"]').type(email);
    cy.get('[data-test="register-password"]').type("123456789");
    cy.get('[data-test="register-btn"]').click();

    cy.contains(
      "Registration successful! Please check your email to verify your account."
    ).should("be.visible");

    // Visit login page

    cy.visit("/login");

    // Log in

    cy.get('[data-test="login-identifier"]').type(email);
    cy.get('[data-test="login-password"]').type("123456789");
    cy.get('[data-test="login-btn"]').click();

    cy.contains("Register as a Professional", { timeout: 15000 }).should(
      "exist"
    );

    cy.url().should("include", "/home");
    cy.window().then((win) => {
      const jwt = win.sessionStorage.getItem("jwt");
      expect(jwt).to.exist;
      cy.wrap(jwt).as("jwt");
    });
    cy.get('[data-test="search-bar"]', { timeout: 15000 }).should("be.visible");
  });

  it("Registers as professional via Header link", () => {
    // Header link → /register-professional
    cy.contains("a", "Register as a Professional").click();

    cy.url().should("include", "/register-professional");

    // Generate random data
    const randomId = Cypress._.random(10000, 99999); 
    const firstName = `John${randomId}`;
    const lastName = `Doe${randomId}`;
    const profession = `Therapist${randomId}`;
    const location = `City${randomId}`;
    const description = `Specialist${randomId}`;
    const phone = `0${Cypress._.random(100000000, 999999999)}`; 
    const hourlyRate = `${Cypress._.random(50, 150)}`; 

    // Fill in the form with random data
    cy.get('[data-test="first-name-input"]').type(firstName);
    cy.get('[data-test="last-name-input"]').type(lastName);
    cy.get('[data-test="profession-input"]').type(profession);
    cy.get('[data-test="location-input"]').type(location);
    cy.get('[data-test="description-input"]').type(description);
    cy.get('[data-test="phone-input"]').type(phone);
    cy.get('[data-test="hourly-rate-input"]').type(hourlyRate);

    cy.contains("button", "Register as a Professional").click();

    cy.contains("Professional profile created successfully", {
      timeout: 15000,
    }).should("exist");

    // The header should now change (role = PROFESSIONAL)
    cy.contains("a", "Register as a Professional", { timeout: 15000 }).should(
      "not.exist"
    );

    cy.get('[data-test="nav-my-account"]', { timeout: 15000 }).should("exist");
    cy.get('[data-test="nav-my-account"]').click();
    cy.url().should("include", "/my-account");

    cy.get(".account-sidebar").should("exist");
    cy.contains("Calendar").should("exist").click();

    cy.get(".rbc-calendar").should("exist");

    cy.get(".rbc-day-slot")
      .last() // pick the last day column (e.g., Saturday)
      .within(() => {
        cy.get(".rbc-time-slot").first().click({ force: true }); // just click the first slot
      });

    cy.contains("button", "Save").click();

    // Verify the event exists
    cy.contains(".rbc-event", "Available Slot", { timeout: 15000 }).should(
      "exist"
    );
  });
});
