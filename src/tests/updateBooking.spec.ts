import { createBookingFixture } from "../fixtures/bookingFixture";
import { statusCodes } from "../mapping/apiMapping";
import { updatedBookingDetails } from "../testData/bookingData";
import { getAuthToken } from "../utils/authUtils";
import { assertBookingDetails, partialUpdateBooking, updateBooking } from "../utils/bookingUtils";
import { getUniqueBookingDetails } from "../utils/commonUtils";

describe("Booking updates", () => {
  const bookings = createBookingFixture();

  afterEach(async () => {
    await bookings.cleanupBookings();
  });

  test("authenticated user can update the booking details", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);
    const token = await getAuthToken();
    const newBookingDetails = {
      ...updatedBookingDetails,
      lastname: bookingDetails.lastname,
    };

    const response = await updateBooking(bookingId, newBookingDetails, token);

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual(newBookingDetails);
    await assertBookingDetails(bookingId, newBookingDetails);
  });

  test("partial update changes the selected fields and keeps the other details", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);
    const token = await getAuthToken();
    const changes = {
      firstname: updatedBookingDetails.firstname,
      additionalneeds: updatedBookingDetails.additionalneeds,
    };

    const response = await partialUpdateBooking(bookingId, changes, token);
    const expectedBookingDetails = { ...bookingDetails, ...changes };

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual(expectedBookingDetails);
    await assertBookingDetails(bookingId, expectedBookingDetails);
  });

  test("booking dates can be updated together", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);
    const token = await getAuthToken();
    const changes = { bookingdates: updatedBookingDetails.bookingdates };

    const response = await partialUpdateBooking(bookingId, changes, token);
    const expectedBookingDetails = { ...bookingDetails, ...changes };

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual(expectedBookingDetails);
    await assertBookingDetails(bookingId, expectedBookingDetails);
  });

  test("partial update accepts a zero price and an unpaid deposit", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);
    const token = await getAuthToken();
    const changes = { totalprice: 0, depositpaid: false };

    const response = await partialUpdateBooking(bookingId, changes, token);
    const expectedBookingDetails = { ...bookingDetails, ...changes };

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual(expectedBookingDetails);
    await assertBookingDetails(bookingId, expectedBookingDetails);
  });
});
