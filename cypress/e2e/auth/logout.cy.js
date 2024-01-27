const pageURL = "http://localhost:5500/";

describe("Login with valid credentials", () => {
  beforeEach(() => {
    cy.visit(pageURL);
    cy.wait(3000);
    cy.get('form[id="registerForm"').within(() => {
      cy.get(
        'button.btn.btn-outline-success[data-bs-target="#loginModal"]',
      ).click();
    });
    cy.wait(1000);
    cy.get('form[id="loginForm"').within(() => {
      cy.get('input[name="email"]').type("boby2@noroff.no");
      cy.get("input#loginPassword").type("123123123");
      cy.get('button[type="submit"]').click();
    });
    cy.url().should("include", "view=profile");
  });

  it("Log out of profile", () => {
    cy.wait(1000);
    cy.get("button.btn.btn-outline-warning.me-2").click();
    cy.wait(1000);
    cy.get('form[id="registerForm"').should("be.visible");
  });
});
