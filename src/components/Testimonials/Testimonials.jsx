'use client';

import React, { useState } from 'react';

function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      text: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      author: "John Doe",
      role: "Customer",
      rating: "★ 4.9",
      image: "/assets/images/card1.png"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      author: "Jane Smith",
      role: "Customer",
      rating: "★ 4.8",
      image: "/assets/images/card2.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-wrapper">
          <button className="slide-btn-prev" onClick={prevSlide}>‹</button>
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`testimonials-content ${index === currentSlide ? 'active' : ''}`}>
                <div className="testimonials-card">
                  <p>{testimonial.text}</p>
                  <div className="testimonials-author">
                    <div className="avatar-bg">
                      <img src={testimonial.image} alt={testimonial.author} />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                    <div className="rating">
                      <span>{testimonial.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="slide-btn-next" onClick={nextSlide}>›</button>
        </div>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

