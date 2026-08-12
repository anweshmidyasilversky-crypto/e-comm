import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { CardContent } from "@/components/ui/card";
import { ShoppingBag, Truck, BadgePercent, ShieldCheck } from "lucide-react";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { actionCodeSettings, firebaseApp } from "@/lib/firebaseConfig";

import { auth } from "@/lib/firebaseConfig";

export function SignInWithEmail() {
  const [email, setEmail] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim() || isSendingLink) {
      return;
    }

    setIsSendingLink(true);

    try {
      await sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings);
      toast("A sign-in link has been sent to your email.", {
        type: "success",
      });

      if (isSignInWithEmailLink(auth, window.location.href)) {
        const user = await signInWithEmailLink(
          auth,
          email,
          window.location.href,
        );
        console.log(user);
      }
    } catch (err) {
      console.dir(err);
      toast(
        err instanceof Error ? err.message : "Unable to send sign-in link.",
        { type: "error" },
      );
    } finally {
      setIsSendingLink(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans flex items-center justify-center bg-slate-100 p-4 sm:p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/50 md:grid-cols-5">
        {/* Brand / Marketing Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2874f0] via-[#3d6ff0] to-[#5b3df0] p-10 text-white md:col-span-2 md:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#fb641b]/30 blur-3xl"
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
              Join thousands of shoppers discovering great deals across fashion,
              electronics, home &amp; more.
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
        </div>

        {/* Form Panel */}
        <div className="flex flex-col justify-center bg-white p-8 sm:p-12 md:col-span-3">
          <div className="mb-6 flex items-center gap-2 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2874f0] text-white">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Shoply
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Enter your credentials
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Please fill in your details to continue.
            </p>
          </div>

          <CardContent className="p-0">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              className="space-y-5"
            >
              <FieldGroup className="space-y-4">
                <Field>
                  <input
                    type="email"
                    required={true}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <FieldDescription className="text-[11px] text-gray-400 mt-1">
                    We'll use this to contact you. We won't share your email.
                  </FieldDescription>
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
                  disabled={isSendingLink}
                  className="w-full bg-[#fb641b] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-orange-200 hover:bg-[#e15615] hover:shadow-lg hover:shadow-orange-200 transition duration-150 border-none h-11 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSendingLink ? "Sending link..." : "Sign In"}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  {/* Reset Button */}
                  <Button
                    type="reset"
                    variant="outline"
                    className="w-full border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 text-xs h-10 w-full py-2.5 text-sm font-medium shadow-sm transition duration-150 h-11"
                  >
                    Reset Form
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 text-xs h-10 w-full py-2.5 text-sm font-medium shadow-sm transition duration-150 h-11"
                    onClick={() => navigate("/signin")}
                  >
                    Login With Email and Password
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
