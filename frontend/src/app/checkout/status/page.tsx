"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyOrderApi, VerifyOrderResponse } from "@/lib/api/payments";

type Status = "loading" | "SUCCESS" | "PENDING" | "FAILED";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 20; // 1 minute total

export default function CheckoutStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [status, setStatus] = useState<Status>("loading");
  const [order, setOrder] = useState<VerifyOrderResponse | null>(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setStatus("FAILED");
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    async function poll() {
      if (cancelled) return;

      const res = await verifyOrderApi(orderId!);

      if (cancelled) return;

      if (!res.success || !res.data) {
        setStatus("FAILED");
        return;
      }

      setOrder(res.data);

      if (res.data.status === "SUCCESS") {
        setStatus("SUCCESS");
        return;
      }

      if (res.data.status === "FAILED") {
        setStatus("FAILED");
        return;
      }

      // Still PENDING
      setPollCount((c) => {
        const next = c + 1;
        if (next >= MAX_POLLS) {
          setStatus("FAILED");
          return next;
        }
        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
        return next;
      });
    }

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [orderId]);

  return (
    <div className="min-h-screen font-body text-on-surface flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-container/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-surface-container/30 blur-[100px] rounded-full pointer-events-none"></div>

      <main className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl font-black text-white italic font-headline tracking-tighter mb-2">
            StackForge
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl overflow-hidden border-t border-white/5 p-8 md:p-10 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="material-symbols-outlined text-primary text-4xl">
                  hourglass_top
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white font-headline mb-3">
                Verifying Payment
              </h1>
              <p className="text-slate-400 text-sm">
                Please wait while we confirm your payment with Paytm…
              </p>
              {orderId && (
                <p className="text-slate-600 text-xs mt-4 font-mono">
                  Order ID: {orderId}
                </p>
              )}
            </>
          )}

          {status === "SUCCESS" && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <span
                  className="material-symbols-outlined text-green-400 text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white font-headline mb-3">
                Payment Successful!
              </h1>
              <p className="text-slate-400 text-sm mb-6">
                You&apos;re now enrolled in the Full Stack Web Development — 2025
                Batch. A confirmation email is on its way.
              </p>
              {order && (
                <div className="bg-surface-container rounded-lg px-4 py-3 text-left space-y-1 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Order ID</span>
                    <span className="text-white font-mono text-xs">
                      {order.orderId}
                    </span>
                  </div>
                  {order.txnId && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Transaction ID</span>
                      <span className="text-white font-mono text-xs">
                        {order.txnId}
                      </span>
                    </div>
                  )}
                  {order.amount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Amount Paid</span>
                      <span className="text-primary font-bold">
                        ₹{order.amount}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-sm uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(250,92,27,0.4)] transition-all duration-300 active:scale-95"
              >
                Go to Dashboard
              </button>
            </>
          )}

          {status === "FAILED" && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <span
                  className="material-symbols-outlined text-red-400 text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  cancel
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white font-headline mb-3">
                Payment Failed
              </h1>
              <p className="text-slate-400 text-sm mb-6">
                {orderId
                  ? "We couldn't confirm your payment. If your account was debited, it will be refunded within 5–7 business days."
                  : "Invalid payment session. Please return to checkout and try again."}
              </p>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-sm uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(250,92,27,0.4)] transition-all duration-300 active:scale-95"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
