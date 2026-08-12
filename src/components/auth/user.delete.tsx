import { userDeleteSchema } from "@/validation/user.delete.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteUser } from "firebase/auth";
import { useForm } from "react-hook-form";

export function DeleteUser() {
  const {} = useForm({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(userDeleteSchema),
  });
}
