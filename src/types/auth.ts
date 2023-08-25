export interface BaseAuthState {
  username: string;
  loginCallback: LoginCallback | string;
}

export interface PostLoginInterface {
  username: string;
  password: string;
}

export interface LoginCallback {
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}

export interface AdditionalUserInfo {
  isNewUser: boolean;
}

export interface User {
  displayName: null;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: any[];
  multiFactor: any[];
  phoneNumber: null;
  photoURL: null;
  providerData: any[];
  providerId: string;
  tenantId: null;
  uid: string;
}
