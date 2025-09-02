import React from "react";
import { Building2, Briefcase, Store, ClipboardCheck, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";

const Commercial = () => {
  return (
    <div className="commercial-d">
      {/* Hero */}
      <section className="hero-d">
        <div className="hero-content-d">
          <span className="badge-d">Commercial Construction</span>
          <h1 className="title-d">Spaces that Power Your Business</h1>
          <p className="subtitle-d">
            From offices to retail stores, we design and build commercial spaces
            that maximize productivity, brand image, and client experience.
          </p>
          <div className="cta-d">
            <button className="btn-primary-d">Get Free Consultation</button>
            <button className="btn-secondary-d">View Commercial Projects</button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="values-d">
        <h2>Why Businesses Trust Us</h2>
        <div className="grid-d">
          <div className="card-d"><Briefcase size={28}/> Professional Delivery</div>
          <div className="card-d"><Store size={28}/> Custom Retail Spaces</div>
          <div className="card-d"><ClipboardCheck size={28}/> Regulatory Compliance</div>
        </div>
      </section>

      {/* Services */}
      <section className="services-d">
        <h2>Commercial Services</h2>
        <div className="grid-d">
          <div className="card-d"><Building2 size={24}/> Office Buildings</div>
          <div className="card-d"><Building2 size={24}/> Retail & Malls</div>
          <div className="card-d"><Building2 size={24}/> Mixed-Use Complexes</div>
        </div>
      </section>

      {/* Process */}
      <section className="process-d">
        <h2>Our Process</h2>
        <ol>
          <li>Site Evaluation</li>
          <li>Design & Architecture</li>
          <li>Construction & Fit-out</li>
          <li>Compliance & Handover</li>
        </ol>
      </section>

      {/* Guarantees */}
      <section className="guarantees-d">
        <h2>Our Guarantees</h2>
        <ul>
          <li><CheckCircle size={20}/> Cost-Effective Solutions</li>
          <li><CheckCircle size={20}/> Safety Compliance</li>
          <li><CheckCircle size={20}/> Post-Project Support</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq-d">
        <h2>FAQs</h2>
        <div>
          <h4>Do you handle large-scale commercial projects?</h4>
          <p>Yes, from single offices to large complexes.</p>
        </div>
        <div>
          <h4>Do you offer maintenance after construction?</h4>
          <p>Yes, we provide ongoing facility management.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-d">
        <h2>Build with Confidence</h2>
        <button className="btn-primary-d">Start Your Project</button>
      </section>
      <Footer/>
    </div>
  );
};

export default Commercial;

