import { createBookingFixture } from "../fixtures/bookingFixture";
import { statusCodes } from "../mapping/apiMapping";
import { assertBookingDetails, getBookingIds } from "../utils/bookingUtils";
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

  test("new booking can be created without additional needs", async () => {
    const bookingDetails = getUniqueBookingDetails();
    delete bookingDetails.additionalneeds;

    const bookingId = await bookings.createBooking(bookingDetails);

    await assertBookingDetails(bookingId, bookingDetails);
  });

  test("new booking can have a zero price and an unpaid deposit", async () => {
    const bookingDetails = getUniqueBookingDetails({ totalprice: 0, depositpaid: false });
    const bookingId = await bookings.createBooking(bookingDetails);

    await assertBookingDetails(bookingId, bookingDetails);
  });

  test("booking list contains the new booking id", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);

    const response = await getBookingIds();

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toContainEqual({ bookingid: bookingId });
  });

  test.each(["firstname", "lastname"] as const)("booking can be found by %s", async (field) => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);

    const response = await getBookingIds({ [field]: bookingDetails[field] });

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toContainEqual({ bookingid: bookingId });
  });

  test.each(["firstname", "lastname"] as const)("no bookings are returned for a nonexistent %s", async (field) => {
    const bookingDetails = getUniqueBookingDetails();
    await bookings.createBooking(bookingDetails);

    const response = await getBookingIds({ [field]: `missing-${bookingDetails.lastname}` });

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual([]);
  });

  test("booking can be found by first name and last name together", async () => {
    const bookingDetails = getUniqueBookingDetails();
    const bookingId = await bookings.createBooking(bookingDetails);

    const response = await getBookingIds({
      firstname: bookingDetails.firstname,
      lastname: bookingDetails.lastname,
    });

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toContainEqual({ bookingid: bookingId });
  });

  test("no bookings are returned when the first name does not match the last name", async () => {
    const bookingDetails = getUniqueBookingDetails();
    await bookings.createBooking(bookingDetails);

    const response = await getBookingIds({
      firstname: `missing-${bookingDetails.lastname}`,
      lastname: bookingDetails.lastname,
    });

    expect(response.status).toBe(statusCodes.ok);
    expect(response.data).toEqual([]);
  });
});
