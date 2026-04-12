"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createOrderApi } from "@/lib/api/payments";

const courseImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA";

const userAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24";

// Hardcoded course ID for the 2025 batch — replace with dynamic routing when courses API is ready
const COURSE_ID = "2025-batch";

const checkoutSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

type CheckoutFields = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFields>({ resolver: zodResolver(checkoutSchema) });

  async function onSubmit(values: CheckoutFields) {
    setServerError(null);
    const res = await createOrderApi({
      courseId: COURSE_ID,
      name: values.name,
      email: values.email,
      phone: values.phone,
    });

    if (!res.success || !res.data) {
      setServerError(res.error?.message ?? "Could not initiate payment. Please try again.");
      return;
    }

    const { orderId, txnToken, amount, mid } = res.data;

    // Redirect to Paytm hosted checkout
    const paytmEnv = process.env.NEXT_PUBLIC_PAYTM_ENV ?? "staging";
    const paytmUrl =
      paytmEnv === "production"
        ? `https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`
        : `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`;

    // Build a form to POST txnToken to Paytm (required by Paytm hosted checkout)
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paytmUrl;

    const fields: Record<string, string> = {
      mid,
      orderId,
      txnToken,
      amount,
      callbackUrl: `${window.location.origin}/checkout/status?orderId=${orderId}`,
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <div className="min-h-screen font-body text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl bg-surface-container-low shadow-[0_0_24px_rgba(232,80,10,0.15)] flex justify-between items-center px-8 h-20">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black text-white italic font-headline tracking-tight">
            StackForge
          </span>
          <nav className="hidden md:flex items-center gap-6">
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Explore
            </a>
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Courses
            </a>
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Live Sessions
            </a>
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Resources
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-400 hover:text-orange-400 transition-all">
            notifications
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/20">
            <img
              alt="User avatar"
              className="w-full h-full object-cover"
              src={userAvatar}
            />
          </div>
          <button className="bg-primary-container text-white font-headline font-bold px-6 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300">
            Get Started
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <section className="lg:col-span-5 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-6 text-white">
                Order Summary
              </h2>
              <div className="flex gap-4 mb-8">
                <div className="w-24 h-24 rounded-lg bg-surface-container-lowest overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Course"
                    src={courseImage}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">
                    Full Stack Web Development — 2025 Batch
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Professional Certification
                  </p>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "12-Month Access to All Modules",
                  "Weekly 1:1 Mentorship Sessions",
                  "Direct Hiring Support with Partners",
                  "Verified Certificate of Excellence",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-on-surface-variant"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-outline-variant/15 pt-6 space-y-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₹1,49,900</span>
                </div>
                <div className="flex justify-between text-primary font-bold text-lg">
                  <span>Total Payable</span>
                  <span>₹1,49,900</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 px-4">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-xl">
                  shield_locked
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  SSL Encrypted
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-xl">
                  verified_user
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Verified Merchant
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-xl">
                  workspace_premium
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Global Standards
                </span>
              </div>
            </div>
          </section>

          <section className="lg:col-span-7">
            <div className="bg-surface-container rounded-xl p-8 lg:p-12 shadow-[0_0_24px_rgba(232,80,10,0.05)] border-t border-outline-variant/10">
              <div className="mb-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Secure Checkout
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  Complete Your Enrollment
                </h1>
                <p className="text-on-surface-variant">
                  Fill in your details to secure your spot in the 2025 batch.
                </p>
              </div>

              {serverError && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm font-medium">
                  {serverError}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full bg-surface-container-lowest border-none rounded-lg py-4 px-5 text-white focus:ring-2 focus:ring-primary shadow-inner placeholder:text-slate-600 transition-all"
                      placeholder="John Doe"
                      type="text"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs ml-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 ml-1">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      className="w-full bg-surface-container-lowest border-none rounded-lg py-4 px-5 text-white focus:ring-2 focus:ring-primary shadow-inner placeholder:text-slate-600 transition-all"
                      placeholder="john@example.com"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs ml-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <div className="w-24 bg-surface-container-lowest rounded-lg flex items-center justify-center text-white font-bold">
                      +91
                    </div>
                    <input
                      {...register("phone")}
                      className="w-full bg-surface-container-lowest border-none rounded-lg py-4 px-5 text-white focus:ring-2 focus:ring-primary shadow-inner placeholder:text-slate-600 transition-all"
                      placeholder="98765 43210"
                      type="tel"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs ml-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-lg py-5 rounded-xl shadow-[0_4px_24px_rgba(250,92,27,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Initiating Payment…"
                    ) : (
                      <>
                        Pay Now with Paytm
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-12">
                <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  Accepted Payment Methods
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-3xl">
                      account_balance
                    </span>
                    <span className="text-[10px] font-bold">UPI</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-3xl">
                      credit_card
                    </span>
                    <span className="text-[10px] font-bold">VISA</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-3xl">
                      payments
                    </span>
                    <span className="text-[10px] font-bold">MASTERCARD</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-3xl">
                      account_balance_wallet
                    </span>
                    <span className="text-[10px] font-bold">WALLETS</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-3xl">
                      phone_android
                    </span>
                    <span className="text-[10px] font-bold">PAYTM</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-sm">lock</span>
                <p className="text-[11px]">
                  Your payment is processed securely via Paytm&apos;s 256-bit
                  encrypted gateway
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto py-10 border-t border-outline-variant/5 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © 2025 StackForge Learning Systems. All rights reserved.
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Refund Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
