import { randomUUID } from "node:crypto";
import { BookingDetailsType } from "../models/bookingTypes";
import { bookingDetails } from "../testData/bookingData";

export function getUniqueBookingDetails(overrides: Partial<BookingDetailsType> = {}): BookingDetailsType {
  return {
    ...bookingDetails,
    ...overrides,
    lastname: `${overrides.lastname || bookingDetails.lastname}-${randomUUID()}`,
    bookingdates: { ...(overrides.bookingdates || bookingDetails.bookingdates) },
  };
}
