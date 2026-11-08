import { BookingDetailsType } from "../models/bookingTypes";

export const bookingDetails: BookingDetailsType = {
  firstname: "johnny",
  lastname: "Test",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2027-03-10",
    checkout: "2027-03-15",
  },
  additionalneeds: "Breakfast",
};

export const updatedBookingDetails: BookingDetailsType = {
  firstname: "Itay",
  lastname: "Test",
  totalprice: 250,
  depositpaid: false,
  bookingdates: {
    checkin: "2027-04-10",
    checkout: "2027-04-18",
  },
  additionalneeds: "Dinner",
};
