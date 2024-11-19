describe("UserFetcher Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("should display loading and then user details on button click", () => {
      // Intercept the API call and mock response
      cy.intercept("GET", "https://jsonplaceholder.typicode.com/users/1", {
        body: { name: "John Doe", email: "john.doe@example.com" },
      }).as("fetchUser");
  
      // Click the button to fetch user
      cy.contains("Fetch User").click();
  
      // Verify the loading state
      cy.contains("Loading...").should("be.visible");
  
      // Wait for the API call to resolve
      cy.wait("@fetchUser");
  
      // Verify the user details
      cy.get("[data-testid=username]").should("have.text", "Name: John Doe");
      cy.get("[data-testid=useremail]").should("have.text", "Email: john.doe@example.com");
    });
  });
  