import { UserInfo } from '../gen/client';

export interface VerifiedUserInfo extends UserInfo {
  emailVerified: boolean;
}
