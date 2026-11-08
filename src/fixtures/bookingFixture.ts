import { statusCodes } from "../mapping/apiMapping";
import { BookingDetailsType } from "../models/bookingTypes";
import { getAuthToken } from "../utils/authUtils";
import { createBooking, deleteBooking, getBookingById } from "../utils/bookingUtils";

export function createBookingFixture() {
  const createdBookings = new Map<number, string>();

  return {
    async createBooking(bookingDetails: BookingDetailsType): Promise<number> {
      const response = await createBooking(bookingDetails);
      expect(response.status).toBe(statusCodes.ok);

      const bookingId = response.data.bookingid;
      expect(Number.isInteger(bookingId)).toBe(true);
      expect(bookingId).toBeGreaterThan(0);

      // Track the booking before checking its details so failed tests still clean up.
      createdBookings.set(bookingId, bookingDetails.lastname);
      expect(response.data.booking).toEqual(bookingDetails);
      return bookingId;
    },

    async cleanupBookings() {
      const bookingsToDelete = [...createdBookings];
      createdBookings.clear();
      const cleanupErrors: unknown[] = [];
      let token: string | undefined;

      for (const [bookingId, lastName] of bookingsToDelete) {
        try {
          const booking = await getBookingById(bookingId);
          if (booking.status === statusCodes.notFound) continue;
          expect(booking.status).toBe(statusCodes.ok);

          // A reset can reuse an ID. Only delete a booking with our unique name.
          if (booking.data.lastname !== lastName) continue;

          token = token || await getAuthToken();
          const response = await deleteBooking(bookingId, token);

          if (response.status === statusCodes.methodNotAllowed) {
            const deletedBooking = await getBookingById(bookingId);
            expect(deletedBooking.status).toBe(statusCodes.notFound);
          } else {
            expect(response.status).toBe(statusCodes.created);
          }
        } catch (error) {
          cleanupErrors.push(error);
        }
      }

      if (cleanupErrors.length > 0) {
        throw new AggregateError(cleanupErrors, "Could not clean up the test bookings");
      }
    },
  };
}
