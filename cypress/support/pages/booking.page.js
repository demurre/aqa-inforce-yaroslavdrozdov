export class BookingPage {
  visit() {
    cy.visit("/");
  }

  setCheckInDate(date) {
    cy.contains("label", "Check In")
      .parent()
      .find("input.form-control")
      .clear()
      .type(date, { force: true });
  }

  setCheckOutDate(date) {
    cy.contains("label", "Check Out")
      .parent()
      .find("input.form-control")
      .clear()
      .type(date, { force: true });
  }

  checkAvailability() {
    cy.get("button")
      .contains(/Check Availability/i)
      .click();
  }

  checkRoomAvailability() {
    cy.get('div.rbc-event-content[title="Unavailable"]').should("exist");
  }
}
