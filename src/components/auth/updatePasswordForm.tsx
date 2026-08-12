import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdatePasswordSchema } from "@/validation/update.password.schema";
import type { UpdatePassword } from "@/types/update.password.type";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CustomInput } from "../common/customInput";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  type User,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

type UpdatePasswordFormProps = {
  onCancel: () => void;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
};

export function UpdatePasswordForm({
  onCancel,
  setIsSubmitting,
  setOpenModal,
  isSubmitting,
}: UpdatePasswordFormProps) {
  const { handleSubmit, reset, control } = useForm<UpdatePassword>({
    resolver: yupResolver(UpdatePasswordSchema),
    defaultValues: {
      currPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const checkPassword = async (oldPassword: string) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email ?? "",
        oldPassword,
      );
      await reauthenticateWithCredential(auth.currentUser as User, credential);
    } catch (err) {
      toast((err as FirebaseError).message, { type: "error" });
      throw err;
    }
  };

  const changePassword = async (newPassword: string) => {
    setIsSubmitting(true);
    try {
      await updatePassword(auth.currentUser as User, newPassword);
      setOpenModal(false);
    } catch (err) {
      toast((err as FirebaseError).message, { type: "error" });
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (data: UpdatePassword) => {
    try {
      await checkPassword(data.currPassword);
      await changePassword(data.newPassword);
      toast("Password change successfull", { type: "success" });
    } catch (err) {}
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <CustomInput
        name="currPassword"
        fieldName="current password"
        control={control}
        inptType="password"
      />
      <CustomInput
        name="newPassword"
        fieldName="new password"
        control={control}
        inptType="password"
      />
      <CustomInput
        name="confirmPassword"
        fieldName="confirm password"
        control={control}
        inptType="password"
      />

      <DialogFooter className="mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            onCancel();
          }}
          className="rounded-lg"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand-orange text-white hover:bg-brand-orange-dark border-none shadow-sm"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </DialogFooter>
    </form>
  );
}
