export interface IUser {
  userId?: number;
  name: string;
  userRole: string;
  emailId: string;
  mobileNo: string;
  password: string;
  createdOn?: string;
}

export interface IUserResponse {
  message: string;
  result: boolean;
  data: string;
}
