import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { UpdatePasswordForm } from "@/components/auth/updatePasswordForm";
import { User as UserIcon, Mail, Lock } from "lucide-react";
import { onAuthStateChanged, reload } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { updateUser } from "@/redux/slices/user.slice";
import {
  changeEmail,
  sendVerificationLink,
  verifyNewMail,
} from "@/lib/firebaseAuth";
import { showFirebaseError } from "@/lib/firebase.errors";

export function UserPage() {
  const user = useAppSelector((state) => state.user);

  const isEmailVerified = Boolean(user.isEmailVerified);
  const dispatch = useAppDispatch();

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  // ── email form state ──
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  onAuthStateChanged(auth, async (currUser) => {
    if (!currUser) {
      return;
    }
    try {
      await reload(currUser);
      if (currUser.emailVerified) {
        dispatch(
          updateUser({
            isEmailVerified: currUser.emailVerified || user.isEmailVerified,
          }),
        );
      }
    } catch (err) {
      toast((err as FirebaseError).message);
    }
  });

  const handleEmailUpdate = async () => {
    setIsEmailSubmitting(true);
    try {
      await changeEmail(newEmail);
      toast("Updated email successfully", { type: "success" });
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/operation-not-allowed") {
          await verifyNewMail(newEmail);
          toast(" Please verify the new email, using the link sent to it ", {
            type: "info",
          });
        } else {
          showFirebaseError(err);
        }
      }
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <main className="min-h-screen w-full bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg">
          {/* ── Profile card ── */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-brand-blue via-brand-blue-dark to-primary" />

            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              {/* Avatar + status */}
              <div className="-mt-10 mb-4 flex items-end justify-between">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-gradient-to-br from-brand-blue to-primary text-2xl font-bold text-white shadow-md">
                  {initials}
                </div>
                <span className="mb-1 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold text-success border border-success/20">
                  Active
                </span>
              </div>

              {/* Name / email */}
              <h1 className="text-xl font-bold text-foreground">
                {displayName}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>

              <Separator className="my-5" />

              {/* ── Info ── */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Account Info
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <UserIcon className="h-4 w-4 shrink-0 text-brand-blue" />
                  <div>
                    <p className="text-[11px] text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {displayName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <Mail className="h-4 w-4 shrink-0 text-brand-blue" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] text-muted-foreground">
                        Email Address
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                          isEmailVerified
                            ? "border-success/30 bg-success/10 text-success"
                            : "border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
                        }`}
                      >
                        {isEmailVerified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {user.email || "—"}
                      </p>
                      {!isEmailVerified && (
                        <Button
                          type="button"
                          variant="outline"
                          className="h-8 rounded-full border-brand-orange/50 px-3 text-[11px] font-semibold text-brand-orange hover:bg-brand-orange/10"
                          onClick={sendVerificationLink}
                        >
                          Verify Mail
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-5" />

              {/* ── Actions ── */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Account Settings
              </p>
              <div className="flex flex-col gap-2.5">
                <Button
                  variant="outline"
                  className="h-11 w-full justify-start gap-3 rounded-lg"
                  onClick={() => setEmailModalOpen(true)}
                >
                  <Mail className="h-4 w-4 text-brand-orange" />
                  <span>Update Email</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full justify-start gap-3 rounded-lg"
                  onClick={() => setPasswordModalOpen(true)}
                >
                  <Lock className="h-4 w-4 text-brand-orange" />
                  <span>Update Password</span>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Shoply. All rights reserved.
          </p>
        </div>
      </main>

      {/* ── Update Email Dialog ── */}
      <Dialog
        open={emailModalOpen}
        onOpenChange={(open) => {
          setEmailModalOpen(open);
          if (!open) {
            setNewEmail("");
            setEmailError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Email</DialogTitle>
            <DialogDescription>
              A verification link will be sent to your new address.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleEmailUpdate();
            }}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium">Current Email</Label>
              <div className="flex h-10 items-center rounded-lg border border-input bg-muted/40 px-3 text-sm text-muted-foreground gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                {user.email}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-email" className="text-sm font-medium">
                New Email
              </Label>
              <Input
                id="new-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className={`h-10 rounded-lg ${emailError ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
              />
              {emailError && (
                <p className="text-xs text-destructive">{emailError}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() => setEmailModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isEmailSubmitting}
                className="rounded-lg bg-brand-orange text-white hover:bg-brand-orange-dark border-none shadow-sm"
              >
                {isEmailSubmitting ? "Updating..." : "Update Email"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Update Password Dialog ── */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Password</DialogTitle>
            <DialogDescription>
              Use a strong, unique password to keep your account secure.
            </DialogDescription>
          </DialogHeader>
          <UpdatePasswordForm
            onCancel={() => setPasswordModalOpen(false)}
            isSubmitting={isPasswordSubmitting}
            setOpenModal={setPasswordModalOpen}
            setIsSubmitting={setIsPasswordSubmitting}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
