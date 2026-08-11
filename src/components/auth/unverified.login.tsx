import { sendEmailVerification, type User } from "firebase/auth";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { actionCodeSettings } from "@/firebase/config";
import { toast } from "react-toastify";
import type { FirebaseError } from "firebase/app";

export function UnverifiedLogin({ user }: { user: User }) {
  const resendMail = async () => {
    try {
      await sendEmailVerification(user, actionCodeSettings);
      toast(`Resent email verification link successfully`, { type: "success" });
    } catch (error) {
      toast((error as FirebaseError).message, { type: "error" });
    }
  };

  return (
    <main className="min-h-screen w-full font-sans flex items-center justify-center bg-[radial-gradient(circle_at_top_left,var(--background),var(--muted))] px-4 py-8 sm:px-6">
      <section className="w-full max-w-md overflow-hidden rounded-[calc(var(--radius)*1.6)] border border-border/60 bg-card shadow-2xl shadow-muted/50">
        <div className="bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-blue-dark),var(--primary))] p-8 text-center text-white">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/12 backdrop-blur-sm">
            <Mail className="h-8 w-8" />
          </span>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Verify your email
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              We sent a secure verification link to your inbox. Please confirm
              it to finish signing in.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-border bg-muted/40 px-4 py-3 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Account email
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {user.email ?? "your email address"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => resendMail()}
              className="h-11 w-full rounded-xl border-none bg-[var(--brand-orange)] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[var(--brand-orange)]/20 transition duration-150 hover:bg-[var(--brand-orange-dark)] hover:shadow-lg hover:shadow-[var(--brand-orange)]/30"
            >
              Resend verification mail
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
