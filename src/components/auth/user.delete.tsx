import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { showFirebaseError } from "@/lib/firebase.errors";
import { userDelete } from "@/lib/firebaseAuth";
import { userDeleteSchema } from "@/validation/user.delete.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInput } from "../common/customInput";
import { persistor, useAppDispatch } from "@/redux/store";
import { useNavigate } from "react-router";
import { removeUser } from "@/redux/slices/user.slice";
import { clearCart } from "@/redux/slices/cart.slice";

type DeleteUserProps = {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DeleteUser({ setOpenModal }: DeleteUserProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, reset } = useForm<{ password: string }>({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(userDeleteSchema),
  });

  const onsubmit = async (data: { password: string }) => {
    setIsSubmitting(true);
    try {
      await userDelete(data.password);
      toast("User deletion successful", { type: "success" });
      reset();
      setOpenModal?.(false);
      dispatch(removeUser());
      dispatch(clearCart());
      persistor.purge();
      navigate("/");
    } catch (err) {
      showFirebaseError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <CustomInput
        control={control}
        name="password"
        fieldName="password"
        inptType="password"
      />

      <DialogFooter className="mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            setOpenModal?.(false);
          }}
          className="rounded-lg"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="destructive"
          className="rounded-lg text-white bg-red-600 hover:bg-red-500"
        >
          {isSubmitting ? "Deleting..." : "Delete Account"}
        </Button>
      </DialogFooter>
    </form>
  );
}
