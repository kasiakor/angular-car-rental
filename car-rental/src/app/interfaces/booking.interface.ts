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
export interface IBookingByCustomerId {
  brand: string;
  bookingNo: string;
  travelDate: string;
  departureTime: string;
  carId: number;
  imageUrl: string;
  locationId: number;
  name: string;
  carBrand: string;
  pricingDescription: string;
  locationTitle: string;
  carOwnerName: string;
  carOwnermobileNo: string;
  bookingId: number;
  isComplete: boolean;
}

export interface IBookingByCustomerIdResponse {
  message: string;
  result: boolean;
  data: IBookingByCustomerId[];
}
