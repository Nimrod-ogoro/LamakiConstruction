import React from "react";
import { Paintbrush, RefreshCw, Wrench, Home, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";

const Renovations = () => {
  return (
    <div className="renovations-d">
      {/* Hero */}
      <section className="hero-d">
        <div className="hero-content-d">
          <span className="badge-d">Renovations</span>
          <h1 className="title-d">Transforming Spaces, Elevating Lifestyles</h1>
          <p className="subtitle-d">
            Whether it’s a kitchen upgrade, office remodel, or complete home
            makeover, we turn old spaces into modern, functional designs.
          </p>
          <div className="cta-d">
            <button className="btn-primary-d">Book Renovation</button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-d">
        <h2>Why Renovate with Us</h2>
        <div className="grid-d">
          <div className="card-d"><Paintbrush size={28}/> Modern Designs</div>
          <div className="card-d"><Wrench size={28}/> Skilled Workmanship</div>
          <div className="card-d"><RefreshCw size={28}/> Quick Turnaround</div>
        </div>
      </section>

      {/* Services */}
      <section className="services-d">
        <h2>Renovation Services</h2>
        <div className="grid-d">
          <div className="card-d"><Home size={24}/> Kitchen & Bathrooms</div>
          <div className="card-d"><Home size={24}/> Full House Remodel</div>
          <div className="card-d"><Home size={24}/> Office & Retail Renovation</div>
        </div>
      </section>

      {/* Process */}
      <section className="process-d">
        <h2>Our Process</h2>
        <ol>
          <li>Inspection & Consultation</li>
          <li>Design Proposal</li>
          <li>Renovation Work</li>
          <li>Final Touches & Handover</li>
        </ol>
      </section>

      {/* Guarantees */}
      <section className="guarantees-d">
        <h2>Our Guarantees</h2>
        <ul>
          <li><CheckCircle size={20}/> Affordable Packages</li>
          <li><CheckCircle size={20}/> Stylish Finishes</li>
          <li><CheckCircle size={20}/> Satisfaction Guarantee</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq-d">
        <h2>FAQs</h2>
        <div>
          <h4>Do you renovate while the property is occupied?</h4>
          <p>Yes, we schedule to minimize disruption.</p>
        </div>
        <div>
          <h4>Can I customize my renovation?</h4>
          <p>Absolutely, all designs are tailored to your needs.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-d">
        <h2>Upgrade Your Space Today</h2>
        <button className="btn-primary-d">Get a Free Renovation Quote</button>
      </section>
      <Footer/>
    </div>
  );
};

export default Renovations;
