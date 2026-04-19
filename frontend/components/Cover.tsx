"use client";

export default function Cover() {
  return (
    <section id="cover" className="section" style={{ background: "var(--navy-dark)" }}>
      <div className="grid-bg" />
      <div className="glow-orange" style={{ top: -300, right: -300 }} />
      <div className="glow-orange" style={{ bottom: -400, left: -200, opacity: 0.6 }} />

      <div className="code-float float-anim" style={{ top: 160, left: 80, transform: "rotate(-4deg)", animationDuration: "7s" }}>
        <div><span className="c">// frontend</span></div>
        <div><span className="k">const</span> <span className="p">app</span> = <span className="k">createRoot</span>(<span className="s">&apos;#root&apos;</span>);</div>
        <div><span className="p">app</span>.<span className="k">render</span>(&lt;<span className="p">App</span>/&gt;);</div>
      </div>
      <div className="code-float float-anim" style={{ top: 220, right: 100, transform: "rotate(5deg)", animationDuration: "8s", animationDelay: "-1s" }}>
        <div><span className="c">// backend</span></div>
        <div><span className="p">app</span>.<span className="k">get</span>(<span className="s">&apos;/api/users&apos;</span>, (req, res) =&gt; &#123;</div>
        <div>&nbsp;&nbsp;res.<span className="k">json</span>(users);</div>
        <div>&#125;);</div>
      </div>
      <div className="code-float float-anim" style={{ bottom: 280, left: 140, transform: "rotate(3deg)", animationDuration: "9s", animationDelay: "-2s" }}>
        <div><span className="c">-- mysql</span></div>
        <div><span className="k">SELECT</span> * <span className="k">FROM</span> <span className="p">students</span></div>
        <div><span className="k">WHERE</span> <span className="p">status</span> = <span className="s">&apos;enrolled&apos;</span>;</div>
      </div>
      <div className="code-float float-anim" style={{ bottom: 240, right: 140, transform: "rotate(-6deg)", animationDuration: "7.5s", animationDelay: "-3s" }}>
        <div><span className="c">{`<!-- html -->`}</span></div>
        <div>{`<`}<span className="k">div</span> <span className="p">class</span>=<span className="s">&quot;hero&quot;</span>{`>`}</div>
        <div>&nbsp;&nbsp;{`<`}<span className="k">h1</span>{`>`}Hello{`</`}<span className="k">h1</span>{`>`}</div>
        <div>{`</`}<span className="k">div</span>{`>`}</div>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "auto 1fr auto", padding: "clamp(60px,5vw,80px) clamp(24px,6vw,100px)", zIndex: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="logo animate-reveal">
            <div className="logo-mark">Z</div>
            <span>Zero to <b style={{ color: "var(--orange)" }}>Stack</b></span>
          </div>
          <div className="cover-badge animate-reveal animate-reveal-d1">
            <span className="pulse-dot" />
            2026 Batch · Now Enrolling
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 className="cover-title animate-reveal animate-reveal-d2">
            Zero to
            <span className="line2">Full&nbsp;Stack<span className="cover-cursor" /></span>
          </h1>
          <div className="cover-sub animate-reveal animate-reveal-d4">
            <span><b>63</b> classes</span>
            <span><b>126</b> hours</span>
            <span><b>14</b> modules</span>
            <span><b>10+</b> projects</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div className="animate-reveal animate-reveal-d5" style={{ fontFamily: "var(--mono)", fontSize: 18, color: "var(--text-dimmer)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            A Full Stack Web Development Program · Hyderabad, India
          </div>
          <div className="animate-reveal animate-reveal-d5" style={{ fontFamily: "var(--mono)", fontSize: 18, color: "var(--text-dimmer)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            2026 / PROSPECTUS
          </div>
        </div>
      </div>
    </section>
  );
}