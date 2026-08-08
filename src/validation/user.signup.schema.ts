import { FIRST_NAME, LAST_NAME, PASSWORD } from "@/constants/length";
import {
  emptyMsg,
  invalidMsg,
  maxLengthMsg,
  minLengthMsg,
  notSelectedMsg,
} from "@/constants/messages";
import { type UserSignupPayload } from "@/types/user.signup.payload.type";
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

export const userSignupSchema: yup.ObjectSchema<UserSignupPayload> = yup.object(
  {
    firstName: yup
      .string()
      .required(emptyMsg("First name"))
      .min(
        FIRST_NAME.minLength,
        minLengthMsg("First name", FIRST_NAME.minLength),
      )
      .max(
        FIRST_NAME.maxLength,
        maxLengthMsg("First name", FIRST_NAME.maxLength),
      ),

    lastName: yup
      .string()
      .defined()
      .max(LAST_NAME.maxLength, maxLengthMsg("Last name", LAST_NAME.maxLength)),

    gender: yup
      .string()
      .required(notSelectedMsg("Gender"))
      .oneOf([...GENDER_OPTIONS]),

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
