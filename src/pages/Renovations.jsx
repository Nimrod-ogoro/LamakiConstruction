import React from "react";
import { Paintbrush, RefreshCw, Wrench, Home, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";

export default function Renovations() {
  return (
    <div className="renovations-d" style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", color: "#222", background: "#f9fafc", lineHeight: "1.7" }}>

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
            poster="/img/renovations-hero.jpg"
          >
            <source src="/video/renovations-hero.mp4" type="video/mp4" />
            {/* graceful fallback */}
            <img
              src={["https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/img-24.JPG", "https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/img-27.jpg", "https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/img-26.JPG", "https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/img-25.JPG"]}
              alt="Modern renovation workspace"
              className="hero-img-fallback"
            />
          </video>
        </div>

        {/* dark overlay so text pops */}
        <div className="hero-overlayd" />

        {/* content sits on top */}
        <div className="hero-contentd">
          <span className="badge">Renovations</span>
          <h1 className="titled">Transforming Spaces, Elevating Lifestyles</h1>
          <p className="subtitle">
            Whether it’s a kitchen upgrade, office remodel, or complete home makeover, we turn old spaces into modern, functional designs.
          </p>
          <div className="cta-d">
            <button className="btn-primary">Book Renovation</button>
          </div>
        </div>
      </section>

      {/* (rest of page unchanged) */}
      {/* Values */}
      <section className="values-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Why Renovate with Us</h2>
        <div className="grid-d" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px" }}>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Paintbrush size={28} /> Modern Designs</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Wrench size={28} /> Skilled Workmanship</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><RefreshCw size={28} /> Quick Turnaround</div>
        </div>
      </section>

      {/* Services */}
      <section className="services-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Renovation Services</h2>
        <div className="grid-d" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "25px" }}>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Home size={24} /> Kitchen & Bathrooms</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Home size={24} /> Full House Remodel</div>
          <div className="card-d" style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0, 64, 128, 0.15)", fontSize: "1.1rem", fontWeight: "600", color: "#0077b6", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-6px)"; e.target.style.boxShadow = "0 10px 24px rgba(0, 64, 128, 0.25)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.15)"; }}><Home size={24} /> Office & Retail Renovation</div>
        </div>
      </section>

      {/* Process */}
      <section className="process-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Our Process</h2>
        <ol style={{ listStyle: "none", padding: "0", maxWidth: "700px", margin: "0 auto" }}>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>1. Inspection & Consultation</li>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>2. Design Proposal</li>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>3. Renovation Work</li>
          <li style={{ background: "#fff", padding: "18px 24px", margin: "15px 0", borderLeft: "6px solid #0077b6", borderRadius: "6px", textAlign: "left", fontWeight: "500", color: "#333", boxShadow: "0 4px 12px rgba(0, 64, 128, 0.1)" }}>4. Final Touches & Handover</li>
        </ol>
      </section>

      {/* Guarantees */}
      <section className="guarantees-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>Our Guarantees</h2>
        <ul style={{ listStyle: "none", padding: "0", maxWidth: "600px", margin: "auto", textAlign: "left" }}>
          <li style={{ background: "#fff", margin: "12px 0", padding: "14px 18px", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0, 64, 128, 0.12)", display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", color: "#004080" }}><CheckCircle size={20} /> Affordable Packages</li>
          <li style={{ background: "#fff", margin: "12px 0", padding: "14px 18px", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0, 64, 128, 0.12)", display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", color: "#004080" }}><CheckCircle size={20} /> Stylish Finishes</li>
          <li style={{ background: "#fff", margin: "12px 0", padding: "14px 18px", borderRadius: "8px", boxShadow: "0 3px 10px rgba(0, 64, 128, 0.12)", display: "flex", alignItems: "center", gap: "10px", fontWeight: "500", color: "#004080" }}><CheckCircle size={20} /> Satisfaction Guarantee</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq-d" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#004080", marginBottom: "40px" }}>FAQs</h2>
        <div style={{ background: "#fff", margin: "16px auto", padding: "20px", borderRadius: "8px", maxWidth: "700px", boxShadow: "0 4px 14px rgba(0, 64, 128, 0.1)", textAlign: "left" }}>
          <h4 style={{ fontSize: "1.2rem", color: "#0077b6", marginBottom: "8px" }}>Do you renovate while the property is occupied?</h4>
          <p>Yes, we schedule to minimize disruption.</p>
        </div>
        <div style={{ background: "#fff", margin: "16px auto", padding: "20px", borderRadius: "8px", maxWidth: "700px", boxShadow: "0 4px 14px rgba(0, 64, 128, 0.1)", textAlign: "left" }}>
          <h4 style={{ fontSize: "1.2rem", color: "#0077b6", marginBottom: "8px" }}>Can I customize my renovation?</h4>
          <p>Absolutely, all designs are tailored to your needs.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-d" style={{ background: "linear-gradient(135deg, #004080, #0077b6)", color: "#fff", textAlign: "center", padding: "70px 20px", borderRadius: "12px", margin: "60px 20px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "25px" }}>Upgrade Your Space Today</h2>
        <button className="btn-primary-d" style={{ background: "#00b4d8", padding: "14px 32px", border: "none", borderRadius: "6px", fontWeight: "600", color: "#fff", cursor: "pointer", transition: "background 0.3s ease, transform 0.2s ease" }} onMouseEnter={(e) => { e.target.style.background = "#0077b6"; e.target.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.target.style.background = "#00b4d8"; e.target.style.transform = "scale(1)"; }}>Get a Free Renovation Quote</button>
      </section>

      <Footer />
    </div>
  );
}