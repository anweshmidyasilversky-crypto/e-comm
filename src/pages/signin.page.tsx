import { updateUser } from "@/redux/slices/user.slice";
import type { UserSignInPayload } from "@/types/user.signin.payload.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router";

import { CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { CustomInput } from "@/components/common/customInput";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck, ShieldCheck, BadgePercent } from "lucide-react";
import { toast } from "react-toastify";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import { userSignInSchema } from "@/validation/user.login.schema";
import { useState } from "react";

import { auth } from "@/firebase/config";
import { UnverifiedLogin } from "@/components/auth/unverified.login";

export function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signInClick, toggleSignInClick] = useState(false);
  const { control, reset, handleSubmit } = useForm<UserSignInPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(userSignInSchema),
  });

  const [unVerifiedUser, setUnVerifiedUser] = useState<User | undefined>(
    undefined,
  );

  const user = useAppSelector((state) => state.user);
  if (user.firstName.length > 0) {
    return <Navigate to={{ pathname: "/dashboard" }} />;
  }

  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (err) {
      toast((err as FirebaseError).message, { type: "error" });
      console.dir(err, (err as FirebaseError).message);
      throw err;
    }
  };

  const onsubmit = async (data: UserSignInPayload) => {
    toggleSignInClick(true);
    try {
      const signedInUser = (await signIn(data.email, data.password)).user;
      if (!signedInUser.emailVerified) {
        setUnVerifiedUser(signedInUser);
      } else {
        toast(`Login success`, { type: "success" });
        dispatch(
          updateUser({
            firstName: signedInUser.displayName ?? "Display",
            email: signedInUser.email ?? "",
            password: "",
            gender: null,
            lastName: "",
            isEmailVerified: signedInUser.emailVerified,
          }),
        );
        navigate("/dashboard");
        reset({
          email: "",
          password: "",
        });
      }
    } catch (err) {
    } finally {
      toggleSignInClick(false);
    }
  };

  return (
    <>
      {unVerifiedUser ? (
        <UnverifiedLogin user={unVerifiedUser} />
      ) : (
        <main className="min-h-screen w-full font-sans flex items-center justify-center bg-[radial-gradient(circle_at_top_left,var(--background),var(--muted))] px-4 py-8 sm:px-6">
          <section className="grid w-full max-w-5xl overflow-hidden rounded-[calc(var(--radius)*1.6)] border border-border/60 bg-card shadow-2xl shadow-muted/50 md:grid-cols-5">
            {/* Brand / Marketing Panel */}
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-blue-dark),var(--primary))] p-10 text-white md:col-span-2 md:flex">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[var(--brand-orange)]/30 blur-3xl"
              />

              <div className="relative z-10 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                <span className="text-lg font-bold tracking-tight">Shoply</span>
              </div>

              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-bold leading-tight text-balance">
                  Everything you love, all in one cart.
                </h2>
                <p className="text-sm leading-relaxed text-white/80">
                  Join thousands of shoppers discovering great deals across
                  fashion, electronics, home &amp; more.
                </p>

                <ul className="space-y-4 pt-2">
                  <li className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Truck className="h-4.5 w-4.5" />
                    </span>
                    Fast, free delivery on eligible orders
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <BadgePercent className="h-4.5 w-4.5" />
                    </span>
                    Exclusive member-only deals every day
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <ShieldCheck className="h-4.5 w-4.5" />
                    </span>
                    Secure checkout, every single time
                  </li>
                </ul>
              </div>

              <p className="relative z-10 text-xs text-white/60">
                © {new Date().getFullYear()} Shoply. All rights reserved.
              </p>
            </aside>

            {/* Form Panel */}
            <section className="flex flex-col justify-center bg-card p-8 sm:p-12 md:col-span-3">
              <div className="mb-6 flex items-center gap-2 md:hidden">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-blue)] text-white">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                <span className="text-base font-bold tracking-tight text-foreground">
                  Shoply
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Enter your credentials
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please fill in your details to continue.
                </p>
              </div>

              <CardContent className="p-0">
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
                  <FieldGroup className="space-y-4">
                    {/* Email Field */}
                    <Field>
                      <CustomInput
                        name="email"
                        control={control}
                        fieldName="Email"
                        inptType="email"
                        placeholder="you@example.com"
                        className="h-11 rounded-xl border-input bg-background focus:border-[var(--brand-blue)]"
                      />
                      <FieldDescription className="mt-1 text-[11px] text-muted-foreground">
                        We'll use this to contact you. We won't share your
                        email.
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
                        className="h-11 rounded-xl border-input bg-background focus:border-[var(--brand-blue)]"
                      />
                    </Field>
                  </FieldGroup>

                  {/* Terms and Privacy Text */}
                  <p className="pt-2 text-[11px] leading-normal text-muted-foreground">
                    By continuing, you agree to the
                    <a
                      href="#"
                      className="mx-1 text-[var(--brand-blue)] hover:underline"
                    >
                      Terms of Use
                    </a>{" "}
                    and
                    <a
                      href="#"
                      className="text-[var(--brand-blue)] hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>

                  {/* Action Buttons Panel */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      disabled={signInClick}
                      type="submit"
                      className="h-11 w-full rounded-xl border-none bg-[var(--brand-orange)] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[var(--brand-orange)]/20 transition duration-150 hover:bg-[var(--brand-orange-dark)] hover:shadow-lg hover:shadow-[var(--brand-orange)]/30"
                    >
                      {signInClick ? "Signing in..." : "Sign in"}
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl border-border text-muted-foreground shadow-sm transition duration-150 hover:bg-muted hover:text-foreground"
                        onClick={() =>
                          reset({
                            email: "",
                            password: "",
                          })
                        }
                      >
                        Reset Form
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl border-border text-muted-foreground shadow-sm transition duration-150 hover:bg-muted hover:text-foreground"
                        onClick={() => navigate("/")}
                      >
                        Don't have an account
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl border-border text-muted-foreground shadow-sm transition duration-150 hover:bg-muted hover:text-foreground"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot Password
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </section>
          </section>
        </main>
      )}
    </>
  );
}
