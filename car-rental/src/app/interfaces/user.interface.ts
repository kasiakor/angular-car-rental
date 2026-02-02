export interface IUserRegister {
  userId?: number;
  name: string;
  userRole: string;
  emailId: string;
  mobileNo: string;
  password: string;
  createdOn?: string;
}

export interface IUserRegisterResponse {
  Message: string;
  Result: boolean;
  Data: string;
}
