import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';


export default function OrderSuccess() {
  const nav = useNavigate();

  useEffect(() => {
    // optional auto-redirect after 10 s
    // const t = setTimeout(() => nav('/'), 10000);
    // return () => clearTimeout(t);
  }, [nav]);

  return (
    <>
      <header className="success-header">Lamaki Designs</header>

      <main className="order-success-page">
        <section className="success-body">
          <CheckCircle className="success-icon" />
          <h2 className="success-title">Payment Successful 🎉</h2>
          <p className="success-message">
            Thank you for your order! Your payment has been received successfully.
            You will get an M-Pesa confirmation SMS shortly, and our team will
            start processing your order.
          </p>

          <div className="success-actions">
            <button className="btn-success btn-primary" onClick={() => nav('/orders')}>
              View My Orders
            </button>
            <button className="btn-success btn-secondary" onClick={() => nav('/')}>
              Continue Shopping
            </button>
            <button className="btn-success btn-home" onClick={() => nav('/')}>
              Go to Home
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}