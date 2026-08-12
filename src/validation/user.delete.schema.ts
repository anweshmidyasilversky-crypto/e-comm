import * as yup from "yup";
import { valdiatePassword } from "./user.login.schema";
import { PASSWORD } from "@/constants/length";
import { emptyMsg, maxLengthMsg, minLengthMsg } from "@/constants/messages";

export const userDeleteSchema = yup.object<{ password: string }>().shape({
  password: yup
    .string()
    .trim()
    .required(emptyMsg("password"))
    .min(PASSWORD.minLength, minLengthMsg("password", PASSWORD.minLength))
    .max(PASSWORD.maxLength, maxLengthMsg("password", PASSWORD.maxLength))
    .test(async (value, context) => {
      const result = valdiatePassword(value);
      return typeof result === "string"
        ? context.createError({ message: result })
        : result;
    }),
});
