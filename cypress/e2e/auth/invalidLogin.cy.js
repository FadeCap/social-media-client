const pageURL = "http://localhost:5500/";

describe("Login with unvalid credentials", () => {
  beforeEach(() => {
    cy.visit(pageURL);
    cy.wait(3000);
  });
  it("Trying to login with invalid email", () => {
    cy.get('form[id="registerForm"').within(() => {
      cy.get(
        'button.btn.btn-outline-success[data-bs-target="#loginModal"]',
      ).click();
    });
    cy.wait(1000);
    cy.get('form[id="loginForm"').within(() => {
      cy.get('input[name="email"]').type(`invalid@email.no`);
      cy.get("input#loginPassword").type("invalidpw");
      cy.get('button[type="submit"]').click();
    });
  });
  it("Trying to login with invalid password", () => {
    cy.get('form[id="registerForm"').within(() => {
      cy.get(
        'button.btn.btn-outline-success[data-bs-target="#loginModal"]',
      ).click();
    });
    cy.wait(1000);
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Either your username was not found or your password is incorrect",
      );
    });
    cy.get('form[id="loginForm"]').within(() => {
      cy.get('input[name="email"]').type(`boby2@noroff.no`);
      cy.get("input#loginPassword").type("invalidpassword");
      cy.get('button[type="submit"]').click();
    });
    cy.get('form[id="loginForm"]').should("be.visible");
  });
});
