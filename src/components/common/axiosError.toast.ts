import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export function errorToast(error: Error) {
  let msg = "Something went wrong";
  if (isAxiosError(error)) {
    msg = error.response?.data?.message || error.message || msg;
  }
  toast(msg, { type: "error" });
  return null;
}
