import { PASSWORD } from "@/constants/length";
import {
  emptyMsg,
  invalidMsg,
  maxLengthMsg,
  minLengthMsg,
} from "@/constants/messages";
import type { UserSignInPayload } from "@/types/user.signin.payload.type";
import * as yup from "yup";

export const GENDER_OPTIONS = ["male", "female", "other"] as const;

export const valdiatePassword = (password: string) => {
  if (password.length < PASSWORD.minLength) {
    return minLengthMsg("password", PASSWORD.minLength);
  }
  const hasSpecial = /[^a-zA-Z0-9 ]/.test(password);
  const alphaNumeric = /[^a-zA-Z0-9 ]/.test(password);

  if (!(hasSpecial && alphaNumeric)) {
    return `Should've alphabet & special character`;
  }

  return true;
};

export const userSignInSchema: yup.ObjectSchema<UserSignInPayload> = yup.object(
  {
    email: yup.string().required(emptyMsg("Email")).email(invalidMsg("Email")),

    password: yup
      .string()
      .required(emptyMsg("Password"))
      .min(PASSWORD.minLength, minLengthMsg("Password", PASSWORD.minLength))
      .max(PASSWORD.maxLength, maxLengthMsg("Password", PASSWORD.maxLength))
      .test(async (value, context) => {
        const result = valdiatePassword(value);
        return typeof result === "string"
          ? context.createError({ message: result })
          : result;
      }),
  },
);
