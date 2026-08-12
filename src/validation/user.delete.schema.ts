import * as yup from "yup";
import { userSignInSchema } from "./user.login.schema";

export const userDeleteSchema = yup.object<{ password: string }>({
  password: yup.Reference,
});
