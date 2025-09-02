import React from "react";
import { CheckCircle, Home, ClipboardList, Users, Shield, Hammer } from "lucide-react";
import Footer from "../components/Footer";

const Residential = () => {
  return (
    <div className="residential-d">
      {/* Hero Section */}
      <section className="hero-d">
        <div className="hero-content-d">
          <span className="badge-d">Residential Construction</span>
          <h1 className="title-d">Building Homes with Heart & Precision</h1>
          <p className="subtitle-d">
            From modern villas to cozy apartments, we bring your dream home to life with
            craftsmanship, innovation, and care.
          </p>
          <div className="cta-d">
            <button className="btn-primary-d">Get Free Quote</button>
            <button className="btn-secondary-d">View Projects</button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="values-d">
        <h2>Why Choose Us</h2>
        <div className="grid-d">
          <div className="card-d"><Home size={28}/> Tailored Home Designs</div>
          <div className="card-d"><Users size={28}/> Experienced Team</div>
          <div className="card-d"><ClipboardList size={28}/> Transparent Process</div>
        </div>
      </section>

      {/* Services */}
      <section className="services-d">
        <h2>Residential Services</h2>
        <div className="grid-d">
          <div className="card-d"><Hammer size={24}/> Custom Home Builds</div>
          <div className="card-d"><Hammer size={24}/> Renovations & Extensions</div>
          <div className="card-d"><Hammer size={24}/> Luxury Villas</div>
        </div>
      </section>

      {/* Process */}
      <section className="process-d">
        <h2>Our Process</h2>
        <ol>
          <li>Consultation & Planning</li>
          <li>Design & Approval</li>
          <li>Construction Phase</li>
          <li>Quality Check & Handover</li>
        </ol>
      </section>

      {/* Guarantees */}
      <section className="guarantees-d">
        <h2>Our Guarantees</h2>
        <ul>
          <li><CheckCircle size={20}/> On-Time Delivery</li>
          <li><CheckCircle size={20}/> Quality Materials</li>
          <li><CheckCircle size={20}/> 24/7 Support</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq-d">
        <h2>Frequently Asked Questions</h2>
        <div>
          <h4>How long does a residential project take?</h4>
          <p>Typical projects take 4-12 months depending on size and complexity.</p>
        </div>
        <div>
          <h4>Do you handle permits?</h4>
          <p>Yes, we manage all approvals and permits for you.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-d">
        <h2>Let’s Build Your Dream Home</h2>
        <button className="btn-primary-d">Start Today</button>
      </section>
      <Footer/>
    </div>
  );
};

export default Residential;

