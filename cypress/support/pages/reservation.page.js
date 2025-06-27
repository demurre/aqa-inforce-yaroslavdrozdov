export class ReservationPage {
  fillGuestInfo({ firstname, lastname, email, phone }) {
    cy.get("form").within(() => {
      cy.get("input[name='firstname']").type(firstname);
      cy.get("input[name='lastname']").type(lastname);
      cy.get("input[name='email']").type(email);
      cy.get("input[name='phone']").type(phone);
    });
  }

  confirmReservation() {
    cy.get("button")
      .contains(/Reserve/i)
      .click();
  }

  shouldSeeConfirmation() {
    cy.get("h2")
      .contains(/Booking confirmed/i)
      .should("be.visible");
  }

  shouldSeeApplicationError() {
    cy.get("h2")
      .contains(/Application error/i)
      .should("be.visible");
  }
}
