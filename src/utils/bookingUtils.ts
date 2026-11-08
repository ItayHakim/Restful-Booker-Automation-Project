import { urlPaths } from "../config/routes";
import { baseApi } from "../fixtures/baseApi";
import { statusCodes } from "../mapping/apiMapping";
import {
  BookingDetailsType,
  BookingFilterType,
  BookingIdType,
  CreateBookingResponseType,
} from "../models/bookingTypes";

export async function createBooking(bookingDetails: BookingDetailsType) {
  return baseApi.post<CreateBookingResponseType>(urlPaths.booking, bookingDetails);
}

export async function getBookingById(bookingId: number) {
  return baseApi.get<BookingDetailsType>(`${urlPaths.booking}/${bookingId}`);
}

export async function getBookingIds(filters: BookingFilterType = {}) {
  return baseApi.get<BookingIdType[]>(urlPaths.booking, { params: filters });
}

export async function updateBooking(bookingId: number, bookingDetails: BookingDetailsType, token?: string) {
  return baseApi.put<BookingDetailsType>(`${urlPaths.booking}/${bookingId}`, bookingDetails, {
    headers: token ? { Cookie: `token=${token}` } : {},
  });
}

export async function partialUpdateBooking(bookingId: number, bookingDetails: Partial<BookingDetailsType>, token?: string) {
  return baseApi.patch<BookingDetailsType>(`${urlPaths.booking}/${bookingId}`, bookingDetails, {
    headers: token ? { Cookie: `token=${token}` } : {},
  });
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
