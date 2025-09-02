import React from "react";
import { ClipboardList, Target, HardHat, Clock, CheckCircle } from "lucide-react";
import Footer from "../components/Footer";

const ProjectManagement = () => {
  return (
    <div className="project-mgmt-d">
      {/* Hero */}
      <section className="hero-d">
        <div className="hero-content-d">
          <span className="badge-d">Project Management</span>
          <h1 className="title-d">Seamless Execution from Start to Finish</h1>
          <p className="subtitle-d">
            We take the stress out of construction by managing every detail—
            from design approvals to final handover—ensuring projects finish on
            time and within budget.
          </p>
          <div className="cta-d">
            <button className="btn-primary-d">Request Management Plan</button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-d">
        <h2>Why Choose Our Management</h2>
        <div className="grid-d">
          <div className="card-d"><ClipboardList size={28}/> Detailed Planning</div>
          <div className="card-d"><Clock size={28}/> On-Time Delivery</div>
          <div className="card-d"><Target size={28}/> Risk Mitigation</div>
        </div>
      </section>

      {/* Services */}
      <section className="services-d">
        <h2>Management Services</h2>
        <div className="grid-d">
          <div className="card-d"><HardHat size={24}/> Resource Allocation</div>
          <div className="card-d"><HardHat size={24}/> Budget Control</div>
          <div className="card-d"><HardHat size={24}/> Quality Monitoring</div>
        </div>
      </section>

      {/* Process */}
      <section className="process-d">
        <h2>Our Process</h2>
        <ol>
          <li>Initial Planning</li>
          <li>Execution Oversight</li>
          <li>Continuous Monitoring</li>
          <li>Final Handover</li>
        </ol>
      </section>

      {/* Guarantees */}
      <section className="guarantees-d">
        <h2>Our Guarantees</h2>
        <ul>
          <li><CheckCircle size={20}/> Cost Savings</li>
          <li><CheckCircle size={20}/> Transparent Reporting</li>
          <li><CheckCircle size={20}/> Dedicated Project Manager</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="faq-d">
        <h2>FAQs</h2>
        <div>
          <h4>Can you manage multiple contractors?</h4>
          <p>Yes, we coordinate subcontractors seamlessly.</p>
        </div>
        <div>
          <h4>Do you use digital tools?</h4>
          <p>We leverage project management software for real-time tracking.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-d">
        <h2>Leave the Stress to Us</h2>
        <button className="btn-primary-d">Hire Project Manager</button>
      </section>
      <Footer/>
    </div>
    
  );
};

export default ProjectManagement;

