import { createBookingFixture } from "../fixtures/bookingFixture";
import { statusCodes } from "../mapping/apiMapping";
import { getAuthToken } from "../utils/authUtils";
import { assertBookingDetails, deleteBooking, getBookingById } from "../utils/bookingUtils";
import { getUniqueBookingDetails } from "../utils/commonUtils";

describe("Booking deletion", () => {
  const bookings = createBookingFixture();

  afterEach(async () => {
    await bookings.cleanupBookings();
  });

  test("booking can be deleted with a valid token", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);
    const token = await getAuthToken();

    const response = await deleteBooking(bookingId, token);

    expect(response.status).toBe(statusCodes.created);

    const deletedBooking = await getBookingById(bookingId);
    expect(deletedBooking.status).toBe(statusCodes.notFound);
  });

  test.each([
    { scenario: "without a token", token: undefined },
    { scenario: "with an invalid token", token: "invalid-token" },
  ])("booking cannot be deleted $scenario", async ({ token }) => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);

    const response = await deleteBooking(bookingId, token);

    expect(response.status).toBe(statusCodes.forbidden);
    await assertBookingDetails(bookingId, bookingDetails);
  });

  test("booking cannot be deleted a second time", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);
    const token = await getAuthToken();

    const response = await deleteBooking(bookingId, token);
    expect(response.status).toBe(statusCodes.created);

    const secondDelete = await deleteBooking(bookingId, token);
    expect(secondDelete.status).toBe(statusCodes.methodNotAllowed);

    const deletedBooking = await getBookingById(bookingId);
    expect(deletedBooking.status).toBe(statusCodes.notFound);
  });
});
