import { urlPaths } from "../config/routes";
import { baseApi } from "../fixtures/baseApi";
import { statusCodes } from "../mapping/apiMapping";
import {
  BookingDetailsType,
  CreateBookingResponseType,
} from "../models/bookingTypes";

export async function createBooking(bookingDetails: BookingDetailsType) {
  return baseApi.post<CreateBookingResponseType>(urlPaths.booking, bookingDetails);
}

export async function getBookingById(bookingId: number) {
  return baseApi.get<BookingDetailsType>(`${urlPaths.booking}/${bookingId}`);
}

export async function deleteBooking(bookingId: number, token?: string) {
  return baseApi.delete<string>(`${urlPaths.booking}/${bookingId}`, {
    headers: token ? { Cookie: `token=${token}` } : {},
  });
}

export async function assertBookingDetails(bookingId: number, bookingDetails: BookingDetailsType) {
  const response = await getBookingById(bookingId);
  expect(response.status).toBe(statusCodes.ok);
  expect(response.data).toEqual(bookingDetails);
}
