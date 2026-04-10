"use client";

const techStack = [
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "terminal" },
  { name: "React", icon: "deployed_code" },
  { name: "Node.js", icon: "dns" },
  { name: "PostgreSQL", icon: "database" },
  { name: "AWS", icon: "cloud" },
  { name: "Tailwind", icon: "view_quilt" },
  { name: "GraphQL", icon: "schema" },
  { name: "Docker", icon: "box" },
  { name: "Redis", icon: "code_blocks" },
  { name: "Next.js", icon: "cyclone" },
  { name: "OAuth 2.0", icon: "security" },
];

const features = [
  {
    icon: "token",
    title: "Production-First Curriculum",
    description: "Learn how to build for scale, not just for \"Hello World\" demos.",
  },
  {
    icon: "hub",
    title: "Integrated Tooling",
    description: "Master Docker, Kubernetes, and CI/CD pipelines alongside your code.",
  },
  {
    icon: "terminal",
    title: "Algorithmic Mastery",
    description: "Deep dive into data structures that power the world's fastest systems.",
  },
];

const phases = [
  {
    number: "01",
    icon: "rocket_launch",
    title: "The Ignition",
    description: "Intensive 4-week core foundation phase focused on logic, algorithms, and fundamental computer science.",
  },
  {
    number: "02",
    icon: "construction",
    title: "The Forge",
    description: "12 weeks of project-based building. You'll architect systems from the DB layer up to the UI, deploying to production daily.",
  },
  {
    number: "03",
    icon: "military_tech",
    title: "The Deployment",
    description: "Career acceleration phase. Portfolio hardening, technical interview simulations, and direct hiring partner referrals.",
  },
];

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Now at Google",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg59ezBjMOzk3ENwsUYt4KJApKbum_IatEFC8Qluzx4R15uDG-KKsFGn3p7hyx2lvstQsTGqn9K7mmf3i4j3VYFVCaa-Xi1RhIMyk-ZWbWw77U8rfgNuT-_LBJMEbtpaZg6UVkC8vdeDZcT4N4EWdh_EHastOsfnZoKWGVO4logPzYCtOmo1nbjjeZsF2KIek2mx_eTch5O5LMFwlsXSPaXfxRGX-2s44avRhQ5vELtDqFAj9ZUZqTR8tvp7v67pZ3_dGwuI6rWOw",
    quote: "StackForge didn't just teach me syntax; it taught me how to think like an engineer. The focus on system architecture was the key to passing my Big Tech interviews.",
  },
  {
    name: "Sarah Jenkins",
    role: "Now at Stripe",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3KSpopMe_VQ8CR_qzd5G_gQ3U0DmwQA579IzRsA2pM0k8aZ3GEDNarYLxbrIBYgt8AjAhiE_Pp9cpKLPJtUFH9gJhz4plsK5BbNtXbb4mEZxVaMkSy4kBy4MUCVPzdR43yaMasK9FKXAD2RhKWhc-AzFaCJrADtwNnwZmRlneZNEDa6YVBtkkYY83Z4ngDPYaaxRswjzqmFc1Cp945cAZspxy6W0xG6c_lt6NB-Eij9HCcKyCpFsvAlaFYHQR3-uB-VA31jgb3_I",
    quote: "The project-based learning is intense but incredibly rewarding. I went from zero coding knowledge to building production-grade fintech apps in months.",
  },
  {
    name: "David Chen",
    role: "Now at Vercel",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6YCxFhoMYegYrOncMWyBkXK5AyNytsotKpb5sI4xS2zG-ZGeGXUZ0aicIuNJgEoWykcniI6RJKaZxrY_vafrHveTA9td6LC1bfFrDP2KX7OIPen1QS2cj25oCjyN7Kyg1ITS8AZC9XfFEF2FgL8IFQsiygIXYn14v6OrdnKMQOk3cuOApgYlxeRicFse9PtbF2XTdhl9D_vcX_YrKZHVjDc_yMdxwWBezeuwC3nL1Q7T2GMlSgaFr2vLJK1pqEJdiWUw-8h6WJMQ",
    quote: "The community at StackForge is unmatched. Having access to senior developers who actually look at your PRs made all the difference in my career transition.",
  },
];

const faqs = [
  {
    question: "Do I need prior experience?",
    answer:
      "Absolutely not. Our curriculum starts from the absolute fundamentals of logic and computation. We've had successful graduates from all walks of life—retail, healthcare, and law.",
  },
  {
    question: "How long does it take to finish?",
    answer:
      "Most students complete the Full Stack Path in 4-6 months of dedicated learning. The curriculum is self-paced, but we recommend 15-20 hours per week for optimal progress.",
  },
  {
    question: "Is the community access lifetime?",
    answer:
      "Yes! Once you join StackForge, you get lifetime access to our private Discord community, including all future updates and additions to the curriculum.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen font-body text-on-surface">
      <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl flex justify-between items-center px-8 h-20 shadow-[0_0_24px_rgba(232,80,10,0.15)]">
        <div className="text-2xl font-black text-white italic font-headline tracking-tight">
          StackForges
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="font-headline font-bold tracking-tight text-primary border-b-2 border-primary pb-1 hover:text-orange-400 transition-all duration-300"
            href="#"
          >
            Explore
          </a>
          <a
            className="font-headline font-bold tracking-tight text-slate-400 hover:text-orange-400 transition-all duration-300"
            href="#"
          >
            Courses
          </a>
          <a
            className="font-headline font-bold tracking-tight text-slate-400 hover:text-orange-400 transition-all duration-300"
            href="#"
          >
            Live Sessions
          </a>
          <a
            className="font-headline font-bold tracking-tight text-slate-400 hover:text-orange-400 transition-all duration-300"
            href="#"
          >
            Resources
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:scale-105 active:scale-95 transition-all">
            notifications
          </span>
          <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-headline font-bold hover:scale-105 active:scale-95 transition-all duration-300">
            Get Started
          </button>
        </div>
      </nav>

      <main className="pt-20">
        <section className="relative min-h-[921px] flex items-center px-8 overflow-hidden bg-surface">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter leading-tight mb-6">
                From <span className="text-primary">Zero</span> to <br />
                Full Stack.
              </h1>
              <p className="text-lg text-on-surface-variant mb-10 max-w-lg">
                Master the modern engineering stack with hands-on labs, real-world
                architecture, and direct mentorship from industry veterans.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-lg font-headline font-extrabold text-lg glow-orange hover:scale-105 active:scale-95 transition-all duration-300">
                  Start Learning Today
                </button>
                <button className="border-2 border-outline-variant text-white px-8 py-4 rounded-lg font-headline font-extrabold text-lg hover:bg-white/5 transition-all duration-300">
                  View Curriculum
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-surface-container-lowest rounded-xl p-1 border-t border-outline-variant/15 glow-orange aspect-video overflow-hidden group">
                <div className="flex gap-2 p-4 border-b border-outline-variant/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="flex gap-4">
                    <span className="text-slate-600">01</span>
                    <span className="text-primary">import</span>{" "}
                    {"{ Forge }"} from{" "}
                    <span className="text-tertiary">&apos;@stackforge/core&apos;</span>;
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">02</span>
                    <span> </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">03</span>
                    <span className="text-primary">const</span> apprentice ={" "}
                    <span className="text-primary">new</span> Forge({"{"});
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">04</span>
                    <span>  skillLevel: <span className="text-tertiary">&apos;ZERO&apos;</span>,</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">05</span>
                    <span>  goal: <span className="text-tertiary">&apos;FULL_STACK&apos;</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">06</span>
                    <span>{"}"});</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">07</span>
                    <span> </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-slate-600">08</span>
                    <span className="text-primary">await</span> apprentice.ignite();
                  </div>
                </div>
                <div className="absolute top-10 -right-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 animate-bounce">
                  React.js
                </div>
                <div className="absolute bottom-12 -left-4 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                  Node.js
                </div>
                <div className="absolute top-1/2 right-10 bg-surface-container-highest px-4 py-2 rounded-lg border border-outline-variant/20 shadow-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span>Senior Dev Certified</span>
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-16">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-headline text-5xl font-black text-primary mb-2">
                15k+
              </div>
              <div className="text-on-surface-variant font-medium">
                Students Graduated
              </div>
            </div>
            <div className="text-center">
              <div className="font-headline text-5xl font-black text-primary mb-2">
                92%
              </div>
              <div className="text-on-surface-variant font-medium">
                Employment Rate
              </div>
            </div>
            <div className="text-center">
              <div className="font-headline text-5xl font-black text-primary mb-2">
                50+
              </div>
              <div className="text-on-surface-variant font-medium">
                Hands-on Projects
              </div>
            </div>
            <div className="text-center">
              <div className="font-headline text-5xl font-black text-primary mb-2">
                $85k
              </div>
              <div className="text-on-surface-variant font-medium">
                Avg. Starting Salary
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-square border border-outline-variant/10">
              <img
                className="w-full h-full object-cover grayscale contrast-125"
                alt="Mechanical keyboard in dark room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8u3h7o5p4mbkopkXyhsRvGgfrPAjMHOpla15KLkTHZgSM4G5SQJKSVfVqaQ1buYvAdXbp-lvHNWb6JG_I3yudQaFYgALrpc9WuhsaCiSdj8EUAF11cCtrqbncdZHXLKbXWc6y1HjNO1oJ7FG3xBK5C-WTYTBsk4iVjVGEM_SALrUmGIDgYxA_u4rQQ9nDAN9f6r33AYHoTFk80cSFXXeeepjEghCfqFqOyA4TaUfCH9IxOG0BPD3LKNbi1GxaIlLsRFL25kY_x8M"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-8 leading-tight">
                What is StackForge?
              </h2>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                StackForge isn&apos;t a tutorial site. It&apos;s a high-performance
                engine for career transformation. We strip away the fluff and focus
                on the technical mechanics that actually matter in production
                environments.
              </p>
              <ul className="space-y-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-1">
                      {feature.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-on-surface-variant">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface-container-low px-8">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-4">
              The Forge Stack
            </h2>
            <p className="text-on-surface-variant">
              Technologies you will master from day one to employment.
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-surface-container p-8 rounded-xl flex flex-col items-center gap-4 hover:bg-surface-container-high transition-colors group cursor-pointer"
              >
                <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">
                  {tech.icon}
                </span>
                <span className="font-bold text-sm tracking-widest text-slate-400 group-hover:text-white uppercase">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-20 text-center">
              Engineered for Results
            </h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-outline-variant/20 -z-10"></div>
              {phases.map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-surface shadow-2xl relative">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      {phase.icon}
                    </span>
                    <div className="absolute -top-2 -right-2 bg-primary text-on-primary-container font-black w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {phase.number}
                    </div>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-4">
                    {phase.title}
                  </h3>
                  <p className="text-on-surface-variant">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface-container-low px-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-4">
                Investment in Your Future
              </h2>
              <p className="text-on-surface-variant">
                One simple plan. All-inclusive access to the platform and community.
              </p>
            </div>
            <div className="w-full max-w-lg bg-surface-container rounded-[2rem] p-12 border border-primary/20 glow-orange relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <div className="bg-primary-container/20 text-primary font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest">
                  Most Popular
                </div>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-2">
                The Full Stack Path
              </h3>
              <p className="text-on-surface-variant mb-8 italic">
                Lifetime Access to Forge Curriculum
              </p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-black text-white">$499</span>
                <span className="text-on-surface-variant">one-time</span>
              </div>
              <ul className="space-y-4 mb-10">
                {[
                  "250+ HD Video Lessons",
                  "Private Discord Community Access",
                  "15 Career-Ready Projects",
                  "Resume & Portfolio Review",
                  "Lifetime Weekly Updates",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-on-primary font-headline font-black py-4 rounded-xl text-lg hover:bg-primary-container transition-colors glow-orange">
                Join the Forge Today
              </button>
              <p className="text-center mt-6 text-sm text-slate-500">
                Secure checkout. 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-4xl font-black mb-16 text-center">
              Forge Graduates
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-surface-container-low p-8 rounded-2xl border-t-4 border-primary"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full grayscale"
                      src={testimonial.image}
                    />
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-xs text-primary font-bold uppercase tracking-widest">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant italic leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl font-black mb-12 text-center">
              Frequently Asked
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-surface-container-low rounded-xl overflow-hidden"
                >
                  <button className="w-full p-6 text-left flex justify-between items-center group">
                    <span className="font-bold text-lg group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined text-slate-500">
                      expand_more
                    </span>
                  </button>
                  <div className="px-6 pb-6 text-on-surface-variant">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/10 pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-black text-white italic font-headline tracking-tight mb-6">
              StackForge
            </div>
            <p className="text-on-surface-variant max-w-sm mb-8 leading-relaxed">
              Forging the next generation of full-stack engineers through
              high-performance, project-driven education.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">share</span>
              </div>
              <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">public</span>
              </div>
              <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined">mail</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Curriculum
            </h4>
            <ul className="space-y-4 text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Frontend Forge
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Backend Systems
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  DevOps & Scale
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Mobile Mastery
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Company
            </h4>
            <ul className="space-y-4 text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Success Stories
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Hiring Partners
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-outline-variant/5 text-center text-slate-600 text-sm">
          © 2024 StackForge Engineering Academy. All rights reserved. Built with
          pride for the engineering community.
        </div>
      </footer>
    </div>
  );
}
