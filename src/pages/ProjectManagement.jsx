import React from "react";
import { ClipboardList, Target, HardHat, Clock, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";

export default function ProjectManagement() {
  return (
    <div className="project-mgmt-d" style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", color: "#222", background: "#f9fafc", lineHeight: "1.7" }}>

      {/* -------------------------------------------------- */}
      {/* HERO – video / image background  (full-bleed)     */}
      {/* -------------------------------------------------- */}
      <section className="hero-dd">
        {/* media layer */}
        <div className="hero-mediad">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-videod"
            poster="/img/project-mgmt-hero.jpg"
          >
            <source src="/video/project-mgmt-hero.mp4" type="video/mp4" />
            {/* graceful fallback */}
            <img
              src={["https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/20241102_135926.jpg", "https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/20241102_134743.jpg", "", "https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/20241102_135317.jpg"]}
              alt="Project manager on site"
              className="hero-img-fallback"
            />
          </video>
        </div>

        {/* dark overlay so text pops */}
        <div className="hero-overlayd" />

        {/* content sits on top */}
        <div className="hero-contentd">
          <span className="badge">Project Management</span>
          <h1 className="titled">Seamless Execution from Start to Finish</h1>
          <p className="subtitle">
            We take the stress out of construction by managing every detail—
            from design approvals to final handover—ensuring projects finish on
            time and within budget.
          </p>
          <div className="cta-d">
            <button className="btn-primary">Request Management Plan</button>
          </div>
        </div>
      </section>

      {/* (rest of page unchanged) */}
      {/* Values */}
      <section className="values-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Why Choose Our Management</h2>
        <div className="grid-d" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px" }}>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><ClipboardList size={28} /> Detailed Planning</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Clock size={28} /> On-Time Delivery</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Target size={28} /> Risk Mitigation</div>
        </div>
      </section>

      {/* Services */}
      <section className="services-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Management Services</h2>
        <div className="grid-d" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px" }}>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><HardHat size={24} /> Resource Allocation</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><HardHat size={24} /> Budget Control</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><HardHat size={24} /> Quality Monitoring</div>
        </div>
      </section>

      {/* Process */}
      <section className="process-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Our Process</h2>
        <ol style={{ listStyle: "none", padding: "0", maxWidth: "700px", margin: "0 auto" }}>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>1. Initial Planning</li>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>2. Execution Oversight</li>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>3. Continuous Monitoring</li>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>4. Final Handover</li>
        </ol>
      </section>

      {/* Guarantees */}
      <section className="guarantees-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Our Guarantees</h2>
        <ul style={{ listStyle: "none", padding: "0", maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          <li style={{ background: "#fff", margin: "12px 0", padding: "14px 18px", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0, 64, 128, 0.12)", display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", color: "#004080" }}><CheckCircle size={20} /> Cost Savings</li>
          <li style={{ background: "#fff", margin: "12px 0", padding: "14px 18px", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0, 64, 128, 0.12)", display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", color: "#004080" }}><CheckCircle size={20} /> Transparent Reporting</li>
          <li style={{ background: "#fff", margin: "12px 0", padding: "14px 18px", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0, 64, 128, 0.12)", display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", color: "#004080" }}><CheckCircle size={20} /> Dedicated Project Manager</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>FAQs</h2>
        <div style={{ background: "#fff", margin: "16px auto", padding: "20px", borderRadius: "8px", maxWidth: "700px", boxShadow: "0 4px 14px rgba(0, 64, 128, 0.1)", textAlign: "left" }}>
          <h4 style={{ fontSize: "1.2rem", color: "#0077b6", marginBottom: "8px" }}>Can you manage multiple contractors?</h4>
          <p>Yes, we coordinate subcontractors seamlessly.</p>
        </div>
        <div style={{ background: "#fff", margin: "16px auto", padding: "20px", borderRadius: "8px", maxWidth: "700px", boxShadow: "0 4px 14px rgba(0, 64, 128, 0.1)", textAlign: "left" }}>
          <h4 style={{ fontSize: "1.2rem", color: "#0077b6", marginBottom: "8px" }}>Do you use digital tools?</h4>
          <p>We leverage project management software for real-time tracking.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-d" style={{ background: "linear-gradient(135deg, #004080, #0077b6)", color: "#fff", textAlign: "center", padding: "70px 20px", borderRadius: "12px", margin: "60px 20px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "25px" }}>Leave the Stress to Us</h2>
        <button className="btn-primary-d" style={{ background: "#00b4d8", padding: "14px 32px", border: "none", borderRadius: "6px", fontWeight: "600", color: "#fff", cursor: "pointer", transition: "background 0.3s ease, transform 0.2s ease" }} onMouseEnter={(e) => { e.target.style.background = "#0077b6"; e.target.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.target.style.background = "#00b4d8"; e.target.style.transform = "scale(1)"; }}>Hire Project Manager</button>
      </section>

      <Footer />
    </div>
  );
}

