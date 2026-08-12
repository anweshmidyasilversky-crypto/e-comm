import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdatePasswordSchema } from "@/validation/update.password.schema";
import type { UpdatePassword } from "@/types/update.password.type";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CustomInput } from "../common/customInput";
import { toast } from "react-toastify";
import { changePassword, reAuthenticate } from "@/lib/firebaseAuth";
import { showFirebaseError } from "@/lib/firebase.errors";

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

  const handleFormSubmit = async (data: UpdatePassword) => {
    setIsSubmitting(true);
    try {
      await reAuthenticate(data.currPassword);

      await changePassword(data.newPassword);
      setOpenModal(false);
      toast("Password change successfull", { type: "success" });
    } catch (err) {
      showFirebaseError(err);
    } finally {
      setIsSubmitting(false);
    }
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
