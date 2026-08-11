export interface UserSignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other" | null;
  isEmailVerified?: boolean;
}
