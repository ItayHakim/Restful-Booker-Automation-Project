export type BookingDetailsType = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
};

export type BookingIdType = {
  bookingid: number;
};

export type CreateBookingResponseType = BookingIdType & {
  booking: BookingDetailsType;
};

export type BookingFilterType = {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
};
