export interface UserMetadata {
  creationTime?: string;
  lastSignInTime?: string;
}

export interface ProviderUserInfo {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface FirebaseUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  tenantId: string | null;
  metadata: UserMetadata;
  providerData: ProviderUserInfo[];
}

export interface CreateUserResponse {
  user: FirebaseUser;
  providerId: string | null;
  operationType: "signIn";
}
