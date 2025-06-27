export class AdminPage {
  login(username, password) {
    cy.visit("/");
    cy.get("a[href='/admin']").first().click();
    cy.get("input#username").clear().type(username);
    cy.get("input#password").clear().type(password);
    cy.get("button#doLogin").click();
  }

  createRoom({ name, type, accessible, price, amenities }) {
    cy.visit("/admin/rooms");
    cy.get("input#roomName").type(name);
    cy.get("select#type").select(type);
    cy.get("select#accessible").select(String(accessible));
    cy.get("input#roomPrice").type(price);

    amenities.forEach((amenity) => {
      cy.get(`input#${amenity}Checkbox`).check();
    });

    cy.get("button#createRoom").click();
  }

  editRoom(roomName, { radio }) {
    cy.visit("/admin/rooms");
    cy.get("p").contains(roomName).click();
    cy.get("button").contains("Edit").click();
    if (radio) cy.get("input#radioCheckbox").check();
    cy.get("button").contains("Update").click();
  }

  deleteRoom(roomName) {
    cy.visit("/admin/rooms");
    cy.get('[data-testid="roomlisting"]')
      .contains("p", roomName)
      .parents('[data-testid="roomlisting"]')
      .find("span.fa-remove")
      .click();
  }

  visitMessages() {
    cy.visit("/admin/message");
  }

  verifyBookingMessage(guest, checkIn, checkOut) {
    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month}-${day}`;
    };

    const checkInFormatted = formatDate(checkIn);
    const checkOutFormatted = formatDate(checkOut);

    cy.get("p").contains(`${guest.firstname} ${guest.lastname}`).click();
    cy.get("p").contains(`${checkInFormatted} to ${checkOutFormatted}`);
  }
}
