import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAPI } from "../api";
import Button from "./ui/Button";

/* ---------- static fall-back data ---------- */
const staticProjects = [
  {
    img: [
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-14.JPG",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-17.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-18.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-19.jpg",
    ],
    description: ["Flat roof bungalow", "Modern kitchen", "Guest house"],
  },
  {
    img: [
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-6.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-7.jpg",
      "https://pub-7d7a723854a4461eb58768b8c0e97058.r2.dev/img-8.jpg",
    ],
    description: ["Spacious modern bungalow", "Modern kitchen"],
  },
];

/* ---------- helper ---------- */
const safe = (arr) => (Array.isArray(arr) ? arr : []);

const Projects = () => {
  const [projects, setProjects] = useState(staticProjects);
  const [currentIndexes, setCurrentIndexes] = useState(
    staticProjects.map(() => 0)
  );
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    index: 0,
  });

  /* ---------- 1.  fetch dynamic projects ---------- */
  useEffect(() => {
    fetchAPI("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const formatted = safe(data).map((p) => ({
          img: safe(p.images).filter(
            (i) => typeof i === "string" && i.trim() !== ""
          ),
          description: safe(p.description),
        }));
        const merged = [...staticProjects, ...formatted];
        setProjects(merged);
        setCurrentIndexes(merged.map(() => 0));
      })
      .catch((err) => console.error("❌ Fetch projects failed:", err));
  }, []);

  /* ---------- 2.  auto-rotate each project gallery ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((idx, i) => {
          const imgs = safe(projects[i]?.img);
          return imgs.length > 0 ? (idx + 1) % imgs.length : 0;
        })
      );
    }, 3000);
    return () => clearInterval(id);
  }, [projects]);

  /* ---------- 3.  lightbox controls ---------- */
  const openLightbox = (images, index) =>
    setLightbox({ isOpen: true, images, index });

  const closeLightbox = () =>
    setLightbox((prev) => ({ ...prev, isOpen: false }));

  const prevImage = () =>
    setLightbox((p) => ({
      ...p,
      index: (p.index - 1 + p.images.length) % p.images.length,
    }));

  const nextImage = () =>
    setLightbox((p) => ({
      ...p,
      index: (p.index + 1) % p.images.length,
    }));

  /* ---------- render ---------- */
  return (
    <section id="projects" className="projects">
      <div className="projects-catalogue">
        <h2 className="projects-heading">Projects Gallery</h2>
        <p className="projects-text">
          Take a sneak peek at a few of our masterpieces
        </p>
      </div>

      <div className="gallery">
        {safe(projects).map((proj, idx) => (
          <Card key={idx} className="projects-card-gallery">
            <CardContent className="project-card-content">
              <div
                className="project-image-single"
                onClick={() => openLightbox(proj.img, currentIndexes[idx])}
              >
                {proj.img.length > 0 && (
                  <img
                    src={proj.img[currentIndexes[idx]]}
                    alt={`Project ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>

              <ul className="project-description">
                {safe(proj.description).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ---------- lightbox ---------- */}
      {lightbox.isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X />
          </button>

          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft />
          </button>

          <img
            src={lightbox.images[lightbox.index]}
            alt="Preview"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight />
          </button>
        </div>
      )}
      <Button className="projects-btn">
        <a href="/GalleryPage">View More</a>
      </Button>
    </section>
  );
};

export default Projects;


