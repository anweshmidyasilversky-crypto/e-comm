import { updateUser, userInitialState } from "@/redux/slices/user.slice";
import type { UserSignupPayload } from "@/types/user.signup.payload.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSignupSchema } from "@/validation/user.signup.schema";
import { useNavigate } from "react-router";

import { CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { CustomInput } from "@/components/common/customInput";
import { useAppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, reset, handleSubmit } = useForm<UserSignupPayload>({
    defaultValues: userInitialState,
    resolver: yupResolver(userSignupSchema),
  });

  const onsubmit = (data: UserSignupPayload) => {
    dispatch(updateUser(data));
    navigate("/dashboard");
    reset(userInitialState);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
      <div className="w-full md:w-3/5 p-8 sm:p-12 flex flex-col justify-center bg-white">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-900">
            Enter your credentials
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Please fill in your details to continue.
          </p>
        </div>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
            <FieldGroup className="space-y-4">
              {/* First & Last Name Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <CustomInput
                    name="firstName"
                    control={control}
                    fieldName="First Name"
                    inptType="text"
                    placeholder="Enter your first name"
                    className="border-gray-300 focus:border-[#2874f0] rounded-sm"
                  />
                </Field>

                <Field>
                  <CustomInput
                    name="lastName"
                    control={control}
                    fieldName="Last Name"
                    inptType="text"
                    placeholder="Enter your last name"
                    className="border-gray-300 focus:border-[#2874f0] rounded-sm"
                  />
                </Field>
              </div>

              {/* Email Field */}
              <Field>
                <CustomInput
                  name="email"
                  control={control}
                  fieldName="Email"
                  inptType="email"
                  placeholder="you@example.com"
                  className="border-gray-300 focus:border-[#2874f0] rounded-sm"
                />
                <FieldDescription className="text-[11px] text-gray-400 mt-1">
                  We'll use this to contact you. We won't share your email.
                </FieldDescription>
              </Field>

              {/* Password Field */}
              <Field>
                <CustomInput
                  control={control}
                  name="password"
                  fieldName="Password"
                  inptType="password"
                  placeholder="Enter your password"
                  className="border-gray-300 focus:border-[#2874f0] rounded-sm"
                />
              </Field>

              {/* Gender Field */}
              <Field>
                <CustomInput
                  control={control}
                  name="gender"
                  fieldName="Gender"
                  inptType="select"
                  className="border-gray-300 focus:border-[#2874f0] rounded-sm"
                />
              </Field>
            </FieldGroup>

            {/* Terms and Privacy Text */}
            <p className="text-[11px] text-gray-500 leading-normal pt-2">
              By continuing, you agree to the
              <a href="#" className="text-[#2874f0] mx-1 hover:underline">
                Terms of Use
              </a>{" "}
              and
              <a href="#" className="text-[#2874f0] hover:underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* Action Buttons Panel */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Primary Action: Orange Login Button */}
              <Button
                type="submit"
                className="w-full bg-[#fb641b] text-white py-2.5 rounded-sm text-sm font-medium shadow-sm hover:bg-[#e15615] transition duration-150 border-none h-11"
              >
                LOGIN
              </Button>

              <div className="grid grid-cols-2 gap-3">
                {/* Reset Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 text-xs h-10 w-full py-2.5 rounded-sm text-sm font-medium shadow-sm transition duration-150 border-none h-11"
                  onClick={() => reset(userInitialState)}
                >
                  Reset Form
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
