export interface ILocation {
  locationId: number;
  city: string;
  title: string;
  pincode: string;
}

export interface ILocationResponse {
  message: string;
  result: boolean;
  data: ILocation[];
}
