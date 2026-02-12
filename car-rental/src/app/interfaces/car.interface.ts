export interface ICar {
  brand: string;
  carId: number;
  imageUrl: string;
  locationId: number;
  name: string;
  pricingDescription: string;
  registeredOn: string;
  carAccessoriess: ICarAccessoriess[];
}

export interface ICarAccessoriess {
  accessoriesId: number;
  accessoriesTitle: string;
  showOnWebsite: boolean;
  carId: number;
}

export interface ICarResponse {
  message: string;
  result: boolean;
  data: ICar[];
}

export interface ICarByIdResponse {
  message: string;
  result: boolean;
  data: ICarById;
}

export interface ICarById {
  carId: number;
  brand: string;
  name: string;
  pricingDescription: string;
  pricing: number;
  locationId: number;
  registeredOn: string;
  imageUrl: string;
  vehicleNo: string;
  ownerUserId: number;
  zoomCarAccessoriess: ICarAccessoriess[];
}
