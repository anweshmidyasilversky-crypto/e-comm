import { emptyMsg, maxLengthMsg, minLengthMsg } from "@/constants/messages";
import { type UpdatePassword } from "@/types/update.password.type";
import { userSignInSchema, valdiatePassword } from "./user.login.schema";
import * as yup from "yup";
import { PASSWORD } from "@/constants/length";

export const UpdatePasswordSchema = yup.object({
  currPassword: yup
    .string()
    .trim()
    .required(emptyMsg("current password"))
    .min(
      PASSWORD.minLength,
      minLengthMsg("current password", PASSWORD.minLength),
    )
    .max(
      PASSWORD.maxLength,
      maxLengthMsg("current password", PASSWORD.maxLength),
    )
    .test(async (value, context) => {
      const result = valdiatePassword(value);
      return typeof result === "string"
        ? context.createError({ message: result })
        : result;
    }),
  newPassword: yup
    .string()
    .trim()
    .required(emptyMsg("new password"))
    .min(PASSWORD.minLength, minLengthMsg("new password", PASSWORD.minLength))
    .max(PASSWORD.maxLength, maxLengthMsg("new password", PASSWORD.maxLength))
    .test(async (value, context) => {
      const result = valdiatePassword(value);
      return typeof result === "string"
        ? context.createError({ message: result })
        : result;
    }),
  confirmPassword: yup
    .string()
    .trim()
    .required(emptyMsg("confirm password"))
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
