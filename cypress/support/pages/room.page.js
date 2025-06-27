export class RoomPage {
  selectFirstRoom() {
    cy.get("section#rooms").find("a").first().click();
  }

  startReservation() {
    cy.get("button#doReservation").click();
  }

  roomShouldExist(roomName) {
    cy.get("section#rooms").should("contain.text", roomName);
  }

  roomShouldNotExist(roomName) {
    cy.get("section#rooms").should("not.contain.text", roomName);
  }
}
