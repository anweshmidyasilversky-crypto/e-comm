import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  BadgePercent,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordResetMail } from "@/lib/firebaseAuth";
import { showFirebaseError } from "@/lib/firebase.errors";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (email: string) => {
    try {
      await passwordResetMail(email);
      toast("Sent password reset link", { type: "success" });
      navigate("/signin");
    } catch (err) {
      showFirebaseError(err);
    }
  };

  return (
    <main className="min-h-screen w-full font-sans flex items-center justify-center bg-[radial-gradient(circle_at_top_left,var(--background),var(--muted))] px-4 py-8 sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[calc(var(--radius)*1.6)] border border-border/60 bg-card shadow-2xl shadow-muted/50 md:grid-cols-5">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-blue-dark),var(--primary))] p-10 text-white md:col-span-2 md:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-(--brand-orange)/30 blur-3xl"
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
        </aside>

        <section className="flex flex-col justify-center bg-card p-8 sm:p-12 md:col-span-3">
          <div className="mb-6 flex items-center gap-2 md:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight text-foreground">
              Shoply
            </span>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
              <Mail className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter your email address and we'll send you a reset link.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="reset-email"
                className="text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <Input
                id="reset-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 rounded-xl border-input bg-background"
              />
            </div>

            <Button
              type="button"
              onClick={() => handleForgotPassword(email)}
              className="h-11 w-full rounded-xl border-none bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-(--brand-orange)/20 transition duration-150 hover:bg-brand-orange-dark hover:shadow-lg hover:shadow-(--brand-orange)/30"
            >
              Send reset link
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full rounded-xl border-border text-muted-foreground shadow-sm transition duration-150 hover:bg-muted hover:text-foreground"
              onClick={() => navigate("/signin")}
            >
              Back to sign in
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
