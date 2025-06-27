import { BookingPage } from "../support/pages/booking.page";
import { RoomPage } from "../support/pages/room.page";
import { ReservationPage } from "../support/pages/reservation.page";

const bookingPage = new BookingPage();
const roomPage = new RoomPage();
const reservationPage = new ReservationPage();

describe("User UI tests", () => {
  const guest = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@gmail.com",
    phone: "+1234567890",
  };

  beforeEach(() => {
    bookingPage.visit();
  });

  it("Room can be booked with valid data", () => {
    bookingPage.setCheckInDate("28/06/2025");
    bookingPage.setCheckOutDate("30/06/2025");
    bookingPage.checkAvailability();

    roomPage.selectFirstRoom();
    roomPage.startReservation();

    reservationPage.fillGuestInfo(guest);
    reservationPage.confirmReservation();
    reservationPage.shouldSeeConfirmation();
  });

  it("Room can’t be booked with invalid data", () => {
    bookingPage.setCheckInDate("28/06/2025");
    bookingPage.setCheckOutDate("30/03/2025");
    bookingPage.checkAvailability();

    roomPage.selectFirstRoom();
    roomPage.startReservation();

    reservationPage.fillGuestInfo(guest);
    reservationPage.confirmReservation();
    reservationPage.shouldSeeApplicationError();
  });

  it("Earlier booked dates show as Unavailable", () => {
    bookingPage.setCheckInDate("28/06/2025");
    bookingPage.setCheckOutDate("30/06/2025");
    bookingPage.checkAvailability();

    roomPage.selectFirstRoom();

    bookingPage.checkRoomAvailability();
  });
});
