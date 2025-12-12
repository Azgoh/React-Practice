describe("Professional availability flow", () => {
  before(() => {
    // Start at register page
    cy.visit("/register");

    cy.get('[data-test="register-username"]').type("John Test");
    cy.get('[data-test="register-email"]').type("john@test.com");
    cy.get('[data-test="register-password"]').type("123456789");
    cy.get('[data-test="register-btn"]').click();

    cy.contains(
      "Registration successful! Please check your email to verify your account."
    ).should("be.visible");

    cy.request("POST", "http://localhost:8080/api/test/auto-verify", {
      email: "john@test.com",
    });

    // Visit login page

    cy.visit("/login");

    // Log in

    cy.get('[data-test="login-identifier"]').type("john@test.com");
    cy.get('[data-test="login-password"]').type("123456789");
    cy.get('[data-test="login-btn"]').click();

    cy.contains("Register as a Professional", { timeout: 8000 }).should(
      "exist"
    );

    cy.url().should("include", "/home");
    cy.window().then((win) => {
      const jwt = win.sessionStorage.getItem("jwt");
      expect(jwt).to.exist;
      // You can store it as an alias for reuse if needed
      cy.wrap(jwt).as("jwt");
    });
    cy.get('[data-test="search-bar"]', { timeout: 10000 }).should("be.visible");
  });

  it("Registers as professional via Header link", () => {
    // Header link → /register-professional
    cy.contains("a", "Register as a Professional").click();

    cy.url().should("include", "/register-professional");

    cy.get('[data-test="first-name-input"]').type("John");
    cy.get('[data-test="last-name-input"]').type("Doe");
    cy.get('[data-test="profession-input"]').type("Therapist");
    cy.get('[data-test="location-input"]').type("Berlin");
    cy.get('[data-test="description-input"]').type("Specialist");
    cy.get('[data-test="phone-input"]').type("0123456789");
    cy.get('[data-test="hourly-rate-input"]').type("80");

    cy.contains("button", "Register as a Professional").click();

    cy.contains("Professional profile created successfully", {
      timeout: 8000,
    }).should("exist");

    // The header should now change (role = PROFESSIONAL)
    cy.contains("a", "Register as a Professional", { timeout: 8000 }).should(
      "not.exist"
    );

    cy.get('[data-test="nav-my-account"]', { timeout: 10000 }).should("exist");
    cy.get('[data-test="nav-my-account"]').click();
    cy.url().should("include", "/my-account");

    cy.get(".account-sidebar").should("exist");
    cy.contains("Calendar").should("exist").click();

    cy.get(".rbc-calendar").should("exist");

    // Pick a visible slot in the morning (index 2 or 3)
    cy.get(".rbc-day-slot")
      .last() // pick the last day column (e.g., Saturday)
      .within(() => {
        cy.get(".rbc-time-slot").first().click({ force: true }); // just click the first slot
      });

    // Fill the pop-up that appears
    cy.contains("button", "Save").click();

    // Verify the event exists
    cy.contains(".rbc-event", "Available Slot", { timeout: 5000 }).should(
      "exist"
    );
  });

  //   it("Creates an availability slot on the calendar", () => {
  //     // Step into "My Account"

  //     cy.get('[data-test="nav-my-account"]', { timeout: 10000 }).should("exist");
  //     cy.get('[data-test="nav-my-account"]').click();
  // You need to tell me the exact path to the calendar
  // Assuming it's linked like:
  // <Link to="/my-calendar">
  //   cy.visit("/my-calendar"); // <-- adjust to your route

  //   // Drag on the first time slot
  //   cy.get(".rbc-time-slot")
  //     .first()
  //     .then(($slot) => {
  //       const { x, y, width, height } = $slot[0].getBoundingClientRect();

  //       cy.get(".rbc-time-view")
  //         .trigger("mousedown", {
  //           clientX: x + width / 2,
  //           clientY: y + height / 3,
  //           force: true,
  //         })
  //         .trigger("mousemove", {
  //           clientX: x + width / 2,
  //           clientY: y + height,
  //           force: true,
  //         })
  //         .trigger("mouseup", { force: true });
  //     });

  //   // Fill popup
  //   cy.get("input[type='text']").clear().type("Available Slot");
  //   cy.contains("button", "Save").click();

  //   // Check event exists
  //   cy.contains(".rbc-event", "Available Slot", { timeout: 5000 }).should(
  //     "exist"
  //   );
  //   });
});
