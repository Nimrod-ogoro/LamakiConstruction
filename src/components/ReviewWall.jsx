// components/ReviewWall.jsx
import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL; // e.g. https://api.lamaki.design

/* ---------- small helpers ---------- */
const stars = (n) =>
  [...Array(5)].map((_, i) => (
    <span key={i} style={{ color: i < n ? "#f59e0b" : "#e5e7eb" }}>★</span>
  ));

const isoToHuman = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ---------- the component ---------- */
export default function ReviewWall() {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState({ author: "", rating: 5, text: "" });
  const [showForm, setShowForm] = useState(false);

  /* 1. load reviews from your backend DB only */
  useEffect(() => {
    (async () => {
      try {
        const ownRes = await fetch(`${API}/api/reviews`).then((r) => r.json());
        setReviews(ownRes.sort((a, b) => b.date - a.date));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* 2. add a client review → POST to DB */
  const addReview = async (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) return;

    try {
      const res = await fetch(`${API}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: form.author,
          rating: form.rating,
          text: form.text,
        }),
      });

      if (!res.ok) throw new Error("Failed to save review");

      const newReview = await res.json();
      setReviews([newReview, ...reviews]); // optimistic UI
      setForm({ author: "", rating: 5, text: "" });
      setShowForm(false);
    } catch (err) {
      alert("Sorry, please try again.", err);
    }
  };

  return (
    <section
      style={{
        padding: "60px 24px",
        background: "#f8fafc",
        marginTop: "640px",
        "@media (min-width: 360px)": { marginTop: "10px" },
      }}
    >
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          What Our Clients Say
        </h2>

        {/* --------- review cards --------- */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading reviews…</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 4px 12px rgba(0,0,0,.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ fontWeight: 600, marginRight: 8 }}>
                    {r.author}
                  </div>
                  <div style={{ fontSize: "1rem" }}>{stars(r.rating)}</div>
                </div>
                <p style={{ color: "#475569", lineHeight: 1.6 }}>
                  “{r.text}”
                </p>
                <div
                  style={{
                    fontSize: ".8rem",
                    color: "#9ca3af",
                    marginTop: 12,
                  }}
                >
                  {isoToHuman(r.date)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------- leave a review --------- */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                background: "#0ea5e9",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Leave us a review
            </button>
          ) : (
            <form
              onSubmit={addReview}
              style={{
                background: "#fff",
                maxWidth: 480,
                margin: "0 auto",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,.05)",
              }}
            >
              <input
                placeholder="Your name"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: 12,
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                }}
                required
              />
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 6 }}>
                  Rating
                </label>
                <select
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: Number(e.target.value) })
                  }
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #d1d5db",
                  }}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n > 1 && "s"}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Tell us about your experience…"
                value={form.text}
                onChange={(e) =>
                  setForm({ ...form, text: e.target.value })
                }
                rows={4}
                style={{
                  width: "100%",
                  marginBottom: 16,
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                }}
                required
              />
              <div>
                <button
                  type="submit"
                  style={{
                    background: "#0ea5e9",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: 6,
                    marginRight: 12,
                    cursor: "pointer",
                  }}
                >
                  Post review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background: "transparent",
                    color: "#64748b",
                    border: "1px solid #d1d5db",
                    padding: "10px 20px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
