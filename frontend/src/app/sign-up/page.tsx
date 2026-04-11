"use client";

const students = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjWEjCX_Btu5sE8qxoaY-VUjOitFLdHo660pz48HOIfRrEeIY03k-Q1Q5ZJ-h2CKvRHF59u92H1-kYPmtKZc-NMtQxA8SnRiu-5iknseXiGu4wWHOCGV-7F3u4dBMoIrdh7OgWQjHyq3lrMesePgzDRKelIJx9uVELaiyz3eGAN0B64xrAel0Bjl7BpeGyGhlspY0hrGyMF-m76DaKq1xJRVPckGiKduABo2ChsQLn7uTp7_Mw-KYpk-6eASQ2ElGl5M4l-SxOD2M",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA25CdGqzTtzkL4TqyEIMz9_cwIQ7FChu61ZiG7liV8wa47S2uI-O2Dr1Vng41Ald_fkK1v6XzkCG4mWIOo-d2yD2WtJ9AxlTwmFiRIfvg4hIdMjDdShkRjUJwb3oTwmc0cBIw4sy-3vBcP4CCGFzerJ9jrXHjPddgTYTlEpPtEaj18dGMmk6L8i5rCuiVEauVpzKpfMuhlP5L7kzhrisvYWi1xMTB3JJuHgIJVqefT12KGTSmLFGS5nMFiG-YGI0L1zYQuP06wbdg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCkjBLVvxDwYbuTagFnnpUQR9iIpWaYOfY9_tcY6AaJwBxG1VRw-OT_piThGlIdC6egdUPIlC0NvanD8zvd9GW9cypK0YhP3caEXf8ue_qlGfLE59u-rsa1eXNnyN60AcpjLxcGs1OX8PUAeyz3sJrxLBXYW7qR7-leEcp5gjmi2NUKbXY-940ceWz8EIkeB6qUMlaSyc9l_npwcQFIg9hZ8ip1vG1YgsxSEngDlKWmGMgGyX4ApW7_7OlSa-yeGo8FY4-gNRwX4U0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCQn_UHuLNj0zV9qg4ATlysNrmpt5mXO3as-feWogmW4a52R-GltCV2QF3oqS1w2n9bAb-nkm1ucjqL8ll-B587HCkf1mbUzEWy0CabC_ELaw8cQjzhghxTHsh7g4uJDX606JvuY1eeRGLr7T59a26zDfxYkwqstBSK8m6IZ7GkgdH6HrMbUA8-i0AbroOb7TEGS-SiuwmPZuUYY_AqsffNyUuLISr9e_4pxVxc6r60Rhla5vWdibBV6cK9F4ZXcSX6s2F9yDHrGio",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDWdWjC8AlZTDjUyQmFHIwffsVJi7KkCaOYKcAcRQ8h2662ciZ4cUHvARk_FH0XYxwiTGILTLTIUkVo-timLuIxXCNYmRXhCRbw-sR6_yatPU2CofHTMCWUGFsnERNs_8QKqyuxb2cyA3UJLVB2LBRlHzTA46-l-95i1peg88XK0RBAaxXxuMb51qIq6rfuMfqFMQJBwhBucHZTK5gTF8FRhvgSwVFK4JwIMsLmbQca3L-tL9ZATbnrQC_PeHTk4Jv7TvPOF1EjHgM",
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen font-body text-on-surface relative overflow-hidden px-4 flex items-center justify-center">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-container/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-surface-container/30 blur-[100px] rounded-full pointer-events-none"></div>

      <main className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl font-black text-white italic font-headline tracking-tighter mb-2">
            StackForge
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl glow-orange overflow-hidden relative border-t border-white/5">
          <div className="p-8 md:p-10">
            <header className="text-center mb-10">
              <h1 className="text-white text-3xl font-extrabold font-headline tracking-tight mb-3 leading-tight">
                Create Your Account
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Join 500+ students already learning
              </p>
            </header>

            <div className="space-y-6">
              <button className="w-full h-14 bg-white hover:bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center gap-3 font-semibold transition-all duration-300 active:scale-95 group shadow-lg">
                <img
                  alt="Google"
                  className="w-6 h-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBooWOdN2bnFKvfdtkofF40bhpyY5gKRmY3hsXbGvZ2RB3AE4TavBERfV5sEgxIKxbM_VsuasGG0ndtiD94J4eAcg3WlP6kBdyWu-SkPoxD7UP9Ud1kKtSVM2y6znXl8RJixFNrD0R3lvPECfxxgJFr0hKs7m42GCwLUE4ynczAqNY58mDjkjxw4bDgDzYidUKAyBL043g1b3wB36BTKI3FwiLRfVlynwyRUbz8i8wUN4ZkEYebq7jyUtWDSp6n4m6GKMPNdLTp75s"
                />
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-outline-variant/15"></div>
                <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  or
                </span>
                <div className="flex-grow border-t border-outline-variant/15"></div>
              </div>

              <form className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full h-12 bg-surface-container-lowest border-none text-white rounded-lg px-4 focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                      placeholder="alex@engineering.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 bg-surface-container-lowest border-none text-white rounded-lg px-4 focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>

                <button
                  className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-sm uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(250,92,27,0.4)] transition-all duration-300 active:scale-95 mt-4"
                  type="submit"
                >
                  Start Building
                </button>
              </form>

              <p className="text-center text-[11px] leading-relaxed text-slate-500 px-4">
                By clicking &quot;Start Building&quot;, you agree to our{" "}
                <a
                  className="text-primary hover:text-white transition-colors underline decoration-primary/30"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="text-primary hover:text-white transition-colors underline decoration-primary/30"
                  href="#"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <div className="bg-surface-container py-5 px-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              {students.map((src, index) => (
                <img
                  key={index}
                  alt={`Student ${index + 1}`}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-low"
                  src={src}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-on-surface uppercase tracking-widest">
              Join them today
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <a
              className="text-primary font-bold hover:text-white transition-colors ml-1"
              href="#"
            >
              Log in
            </a>
          </p>
        </div>
      </main>

      <div className="fixed bottom-10 right-10 flex flex-col items-end opacity-20 pointer-events-none select-none">
        <div className="text-[120px] font-black text-white/5 leading-none font-headline uppercase select-none">
          FORGE
        </div>
        <div className="text-[80px] font-black text-primary/10 leading-none font-headline uppercase select-none -mt-8">
          STACK
        </div>
      </div>
    </div>
  );
}
