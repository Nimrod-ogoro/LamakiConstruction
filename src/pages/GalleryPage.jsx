// pages/GalleryPage.jsx
import React, { useEffect, useState } from "react";

import Footer from "../components/Footer";
import { fetchAPI } from "../api";
import { ChevronRight, X, ChevronLeft } from "lucide-react"; // ➕ icons
import BackHomeNavbar from "../components/BackHomeNavbar";


const GalleryPage = () => {
  const [projects, setProjects] = useState([]);

  /* ➕ overlay state */
  const [overlay, setOverlay] = useState(null); // {images[], startIndex}

  /* ➕ current index inside overlay */
  const [current, setCurrent] = useState(0);

  /* ➕ auto-shuffle timer per card */
  const SHUFFLE_MS = 2_500;

  useEffect(() => {
    fetchAPI("/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, []);

  /* ➕ keyboard navigation for overlay */
  useEffect(() => {
    if (!overlay) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOverlay(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay, current]);

  /* ➕ helpers */
  const next = () =>
    setCurrent((c) => (c + 1) % overlay.images.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + overlay.images.length) % overlay.images.length);

  /* ➕ single card slideshow component */
  const CardSlideshow = ({ images, name }) => {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      if (!images?.length) return;
      const t = setInterval(() => setIdx((i) => (i + 1) % images.length), SHUFFLE_MS);
      return () => clearInterval(t);
    }, [images]);
    if (!images?.length) return <img src="/fallback.jpg" alt={name} />;
    return (
      <img
        src={images[idx]}
        alt={name}
        loading="lazy"
        onClick={() => setOverlay({ images, startIndex: idx })}
        className="clickable"
      />
    );
  };

  return (
    <>
      <BackHomeNavbar />

      {/* ===== CEO STATEMENT ===== */}
      <section className="ceo-hero">
        <div className="ceo-container">
          <div className="ceo-image">
            <img
              src="https://pub-06a2a441a00c4ef597b4f4f0cac7cddf.r2.dev/ceo.jpg"
              alt="CEO Portrait"
            />
          </div>
          <div className="ceo-text">
            <h1>We build spaces that breathe.</h1>
            <p>
              From concept to keys, Lamaki Designs delivers modern, sustainable
              construction across East Africa. Our team combines global
              expertise with local insight to create homes and commercial spaces
              that stand the test of time.
            </p>
            <a href="#projects" className="cta-btn">
              Explore Projects <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS GALLERY ===== */}
      <section id="projects" className="gallery-page">
        <div className="container">
          <h2 className="titled">Our Work</h2>
          <p className="subtitle">Take a sneak peek at a few of our masterpieces</p>

          <div className="grid">
            {projects.map((p) => (
              <div key={p.id} className="card">
                <CardSlideshow images={p.images} name={p.name} />
                <div className="info">
                  <h3>{p.name}</h3>
                  <ul>
                    {(p.description || []).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ➕ full-screen overlay */}
      {overlay && (
        <div className="overlay" onClick={() => setOverlay(null)}>
          <button className="close-btn" onClick={(e) => { e.stopPropagation(); setOverlay(null); }}>
            <X size={28} />
          </button>

          <button className="nav-btn left" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={32} />
          </button>

          <img
            src={overlay.images[current]}
            alt=""
            className="overlay-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="nav-btn right" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryPage;