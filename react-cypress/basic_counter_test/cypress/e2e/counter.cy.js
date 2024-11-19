describe("Counter Component", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("should display the initial count", () => {
      cy.get("[data-testid=count]").should("have.text", "0");
    });
  
    it("should increment the count", () => {
      cy.contains("Increment").click();
      cy.get("[data-testid=count]").should("have.text", "1");
    });
  
    it("should decrement the count", () => {
      cy.contains("Decrement").click();
      cy.get("[data-testid=count]").should("have.text", "-1");
    });
  });
  