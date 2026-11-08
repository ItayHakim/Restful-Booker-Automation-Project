import { createBookingFixture } from "../fixtures/bookingFixture";
import { assertBookingDetails } from "../utils/bookingUtils";
import { getUniqueBookingDetails } from "../utils/commonUtils";

describe("Booking creation and retrieval", () => {
  const bookings = createBookingFixture();

  afterEach(async () => {
    await bookings.cleanupBookings();
  });

  test("new booking can be created and retrieved with its details", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);

    await assertBookingDetails(bookingId, bookingDetails);
  });
});
