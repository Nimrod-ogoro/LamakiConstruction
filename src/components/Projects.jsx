import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const project = [
  {
    img: [
      "/img-16.jpg", "/img-17.jpg", "/img-18.jpg",
      "/img-19.jpg", "/img-20.jpg", "/img-21.jpg", "/img-22.jpg", "/img-23.jpg"
    ],
    description: [
      "Flat roof bungalow", "Modern kitchen", "Guest house",
      "Electric fence", "Modern interior design and lighting"
    ]
  },
  {
    img: [
      "/img-6.jpg", "/img-7.jpg", "/img-8.jpg", "/img-1.jpg", "/img-2.jpg",
      "/img-3.jpg", "/img-4.jpg", "/img-5.jpg", "/img-9.jpg", "/img-10.jpg",
      "/img-11.jpg", "/img-12.jpg"
    ],
    description: [
      "Spacious modern bungalow", "Modern kitchen", "Modern interior design and lighting"
    ]
  },
  {
    img: [
      "img-28", "img-29", "img-30", "img-31", "img-32"
    ],
    description: [
      "Modern flat roof mansion", "Modern interior design and lighting",
      "Modern kitchen", "Double roof design"
    ]
  }
];

const Projects = () => {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    index: 0
  });

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const prevImage = () => {
    setLightbox({
      ...lightbox,
      index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length
    });
  };

  const nextImage = () => {
    setLightbox({
      ...lightbox,
      index: (lightbox.index + 1) % lightbox.images.length
    });
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-catalogue">
        <h2 className="projects-heading">Projects Gallery</h2>
        <p className="projects-text">
          Take a sneak peek at a few of our masterpieces
        </p>
      </div>

      <div className="gallery">
        {project.map((proj, index) => (
          <Card key={index} className="projects-card-gallery">
            <CardContent className="project-card-content">
              <div className="project-images">
                {proj.img.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="project-image"
                    onClick={() => openLightbox(proj.img, imgIndex)}
                  />
                ))}
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
          <img
            src={lightbox.images[lightbox.index]}
            alt="Preview"
            className="lightbox-image"
          />
          <button className="lightbox-next" onClick={nextImage}><ChevronRight /></button>
        </div>
      )}
    </section>
  );
};

export default Projects;
