export interface IBookingNew {
  bookingId: number;
  customerId: number;
  fromLocationId: number;
  toLocationId: number;
  travelDate: string;
  startTime: string;
  carId: number;
  pickupAddress: string;
  alternateContactNo: string;
  invoiceNo: string;
  isComplete: boolean;
}

export interface IBookingNewResponse {
  message: string;
  result: boolean;
  data: null;
}
