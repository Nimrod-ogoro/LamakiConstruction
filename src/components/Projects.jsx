import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const staticProjects = [
  {
    img: ["/img-16.jpg", "/img-17.jpg", "/img-18.jpg", "/img-19.jpg", "/img-20.jpg", "/img-21.jpg", "/img-22.jpg", "/img-23.jpg"],
    description: ["Flat roof bungalow", "Modern kitchen", "Guest house", "Electric fence", "Modern interior design and lighting"]
  },
  {
    img: ["/img-6.jpg", "/img-7.jpg", "/img-8.jpg", "/img-1.jpg", "/img-2.jpg", "/img-3.jpg", "/img-4.jpg", "/img-5.jpg", "/img-9.jpg", "/img-10.jpg", "/img-11.jpg", "/img-12.jpg"],
    description: ["Spacious modern bungalow", "Modern kitchen", "Modern interior design and lighting"]
  },
  {
    img: ["img-28.jpg", "img-29.jpg", "img-30.jpg", "img-31.jpg", "img-32.jpg"],
    description: ["Modern flat roof mansion", "Modern interior design and lighting", "Modern kitchen", "Double roof design"]
  }
];

const Projects  = () => {
  const [projects, setProjects] = useState(staticProjects);
  const [currentIndexes, setCurrentIndexes] = useState(projects.map(() => 0));
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  // ✅ Fetch dynamic projects from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map(p => ({
          img: p.images.map(i => `http://localhost:5000/uploads/${i}`), // ✅ prepend uploads path
          description: Array.isArray(p.description) ? p.description : [p.description]
        }));
        setProjects([...staticProjects, ...formatted]); // merge static + dynamic
        setCurrentIndexes([...staticProjects, ...formatted].map(() => 0));
      })
      .catch(err => console.error("❌ Fetch projects failed:", err));
  }, []);

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prev) =>
        prev.map((idx, projIndex) =>
          (idx + 1) % projects[projIndex].img.length
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [projects]);

  const openLightbox = (images, index) => setLightbox({ isOpen: true, images, index });
  const closeLightbox = () => setLightbox({ ...lightbox, isOpen: false });
  const prevImage = () => setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
  const nextImage = () => setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));

  return (
    <section id="projects" className="projects">
      <div className="projects-catalogue">
        <h2 className="projects-heading">Projects Gallery</h2>
        <p className="projects-text">Take a sneak peek at a few of our masterpieces</p>
      </div>

      <div className="gallery">
        {projects.map((proj, index) => (
          <Card key={index} className="projects-card-gallery">
            <CardContent className="project-card-content">
              <div className="project-image-single">
                <img
                  src={proj.img[currentIndexes[index]]}
                  alt={`Project ${index + 1}`}
                  onClick={() => openLightbox(proj.img, currentIndexes[index])}
                />
              </div>
              <ul className="project-description">
                {proj.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {lightbox.isOpen && (
        <div className="lightbox-overlay">
          <button className="lightbox-close" onClick={closeLightbox}><X /></button>
          <button className="lightbox-prev" onClick={prevImage}><ChevronLeft /></button>
          <img src={lightbox.images[lightbox.index]} alt="Preview" className="lightbox-image" />
          <button className="lightbox-next" onClick={nextImage}><ChevronRight /></button>
        </div>
      )}
    </section>
  );
};

export default Projects;



