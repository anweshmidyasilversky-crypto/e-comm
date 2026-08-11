import { useForm } from "react-hook-form";
import { CustomInput } from "../common/customInput";
import { type UpdatePassword } from "@/types/update.password.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdatePasswordSchema } from "@/validation/update.password.schema";
import { validatePassword, updatePassword, type User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

const defaultValues = {
  currPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function UpdatePasswordForm() {
  const { control, handleSubmit, reset } = useForm<UpdatePassword>({
    defaultValues,
    resolver: yupResolver(UpdatePasswordSchema),
  });

  const validateCurrPassword = async (currPassword: string) => {
    try {
      const isValid = (await validatePassword(auth, currPassword)).isValid;
      if (!isValid) {
        throw new FirebaseError("auth/password", "Invalid Password");
      }
    } catch (err) {
      toast((err as FirebaseError).message, { type: "error" });
      throw err;
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      await updatePassword(auth.currentUser as User, newPassword);
      toast("Password Updated", { type: "success" });
    } catch (error) {
      toast((error as FirebaseError).message);
      throw error;
    }
  };

  const onsubmit = async (data: UpdatePassword) => {
    try {
      await validateCurrPassword(data.currPassword);
      await changePassword(data.newPassword);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit(onsubmit)}>
        <CustomInput
          control={control}
          name="currPassword"
          fieldName="current password"
          inptType="password"
        />
        <CustomInput
          control={control}
          name="newPassword"
          fieldName="new password"
          inptType="password"
        />
        <CustomInput
          control={control}
          name="confirmPassword"
          fieldName="confirm password"
          inptType="password"
        />

        <Button type="submit">update password</Button>

        <Button type="reset" onClick={() => reset(defaultValues)}>
          reset
        </Button>
      </form>
    </div>
  );
}
