// components/FAQ.jsx
import React, { useState } from "react";

const faqs = [
  { q: "What types of construction projects do you handle?", a: "We handle residential bungalows, commercial buildings, flat-roof extensions, modern kitchens, guest houses, and full-scale renovations." },
  { q: "How long does a typical bungalow take to complete?", a: "A standard 3-bedroom bungalow takes 12–16 weeks from ground-breaking to hand-over, assuming no major design changes." },
  { q: "Do you offer financing or payment plans?", a: "Yes. We work with trusted financial partners to provide milestone-based payment plans up to 24 months." },
  { q: "Are your prices fixed or estimates?", a: "We give a fixed lump-sum contract after the final drawing is approved. Any client-initiated change is priced as a variation." },
  { q: "Do you handle permits and approvals?", a: "Absolutely. We obtain county building permits, NEMA approvals, and any other statutory clearances on your behalf." },
  { q: "What materials do you use?", a: "We use Kenyan Bureau of Standards (KEBS) approved materials. For roofing we recommend Mabati Rolling Mills or similar tier-1 brands." },
  { q: "Can I supply my own materials to reduce cost?", a: "Yes, but they must meet our quality spec and be delivered before the relevant milestone. We still warranty our workmanship." },
  { q: "Do you give warranties?", a: "10-year structural warranty, 2-year roof leak warranty, and 1-year fixtures warranty. Terms are detailed in the contract." },
  { q: "How do I track progress during construction?", a: "You get a private dashboard with weekly drone photos, milestone calendar, and direct chat with the site engineer." },
  { q: "What happens if I want to change the design mid-project?", a: "We issue a variation order with cost and time impact. Once you sign, we implement the change without delaying unrelated works." },
  { q: "Do you build outside Nairobi?", a: "We cover the entire East-African region. Travel costs are factored into the initial quotation." },
  { q: "How do you ensure site safety?", a: "We follow OSHA guidelines: hard hats, steel-toe boots, scaffolding inspections, and weekly safety briefings. Zero lost-time accidents since 2020." },
  { q: "Can I visit the site anytime?", a: "Yes, but for insurance reasons we ask for 24-hour notice so we can brief you on safety protocols." },
  { q: "What is your after-sales service?", a: "Free first-year maintenance check, 24-hour response for leaks or cracks, and a dedicated WhatsApp hotline for life." },
  { q: "How do I get started?", a: "Click “Get Quote” on this site, upload your sketch or land documents, and we’ll send a preliminary estimate within 48 hours." },
];
const FAQ = () => {
  const [open, setOpen] = useState(null);

  /* close all <details> except the one we just clicked */
  const toggle = (idx) => {
    setOpen((prev) => {
      const next = prev === idx ? null : idx;

      /* DOM-level close (instant, no flash) */
      document.querySelectorAll<HTMLDetailsElement>("details").forEach((d, i) => {
        d.open = i === next;
      });

      return next;
    });
  };

  return (
    <section id="faq" style={{ padding: "60px 24px", background: "linear-gradient(to bottom, #f8fafc, #eef2f6)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#0f172a" }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "grid", gap: 16 }}>
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={open === idx}
              onClick={(e) => {
                e.preventDefault(); // stop native toggle
                toggle(idx);
              }}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "24px 28px",
                boxShadow: "0 4px 12px rgba(0,0,0,.05)",
                cursor: "pointer",
                transition: "all .25s ease",
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  listStyle: "none",
                  color: "#0f172a",
                }}
              >
                {faq.q}
                <span style={{ fontSize: "1.4rem", color: "#0ea5e9" }}>{open === idx ? "−" : "+"}</span>
              </summary>
              <p style={{ marginTop: 16, color: "#475569", lineHeight: 1.7 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;