export interface UserInfoResponse {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  picture: string;
}
export interface UserInfo extends UserInfoResponse {
  emailVerified: boolean;
}
