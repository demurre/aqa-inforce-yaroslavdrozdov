// cypress/e2e/admin_api.cy.js
import { BookingPage } from "../support/pages/booking.page";
import { ReservationPage } from "../support/pages/reservation.page";
import { RoomPage } from "../support/pages/room.page";
import { AdminPage } from "../support/pages/admin.page";

const bookingPage = new BookingPage();
const roomPage = new RoomPage();
const reservationPage = new ReservationPage();
const adminPage = new AdminPage();

const guest = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  phone: "+1234567890",
};

describe("Admin API tests", () => {
  beforeEach(() => {
    adminPage.login(Cypress.env("ADMIN_NAME"), Cypress.env("ADMIN_PASSWORD"));
  });

  it("Create a Room via Admin UI and verify on User UI", () => {
    adminPage.createRoom({
      name: "201",
      type: "Single",
      accessible: true,
      price: "201",
      amenities: ["wifi", "tv"],
    });

    bookingPage.visit();
    bookingPage.setCheckInDate("28/06/2025");
    bookingPage.setCheckOutDate("30/06/2025");
    bookingPage.checkAvailability();
    roomPage.roomShouldExist("201");
  });

  it("Book the room via User UI and verify on Admin UI", () => {
    bookingPage.visit();
    bookingPage.setCheckInDate("28/06/2025");
    bookingPage.setCheckOutDate("30/06/2025");
    bookingPage.checkAvailability();

    roomPage.selectFirstRoom();
    roomPage.startReservation();

    reservationPage.fillGuestInfo(guest);
    reservationPage.confirmReservation();
    reservationPage.shouldSeeConfirmation();

    adminPage.visitMessages();
    adminPage.verifyBookingMessage(guest, "28/06/2025", "30/06/2025");
  });

  it("Edit room via Admin UI and verify changes on User UI", () => {
    adminPage.editRoom("201", { radio: true });

    bookingPage.visit();
    bookingPage.setCheckInDate("01/07/2025");
    bookingPage.setCheckOutDate("03/07/2025");
    bookingPage.checkAvailability();

    roomPage.selectFirstRoom();
    roomPage.startReservation();

    reservationPage.fillGuestInfo(guest);
    reservationPage.confirmReservation();
    reservationPage.shouldSeeConfirmation();
  });

  it("Delete room via Admin UI and verify it's gone on User UI", () => {
    adminPage.deleteRoom("201");

    bookingPage.visit();
    bookingPage.setCheckInDate("28/06/2025");
    bookingPage.setCheckOutDate("30/06/2025");
    bookingPage.checkAvailability();

    roomPage.roomShouldNotExist("201");
  });
});
