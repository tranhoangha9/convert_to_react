import React, { useState, useEffect } from 'react';

function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      text: "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      author: "John Doe",
      role: "Customer",
      rating: "★ 4.9"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      author: "Jane Smith",
      role: "Customer",
      rating: "★ 4.8"
    }
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-wrapper">
            <button className="slide-btn-prev" onClick={prevSlide}>‹</button>
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className={`testimonials-content ${index === currentSlide ? 'active' : ''}`}>
                  <div className="testimonials-card">
                    <p>{testimonial.text}</p>
                    <div className="testimonials-author">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0ZM30 45C20.6112 45 13 37.3888 13 28C13 18.6112 20.6112 11 30 11C39.3888 11 47 18.6112 47 28C47 37.3888 39.3888 45 30 45Z" fill="#1E1E1E"/>
                        <path d="M30 15C24.4772 15 20 19.4772 20 25C20 30.5228 24.4772 35 30 35C35.5228 35 40 30.5228 40 25C40 19.4772 35.5228 15 30 15ZM30 30C26.6863 30 24 27.3137 24 24C24 20.6863 26.6863 18 30 18C33.3137 18 36 20.6863 36 24C36 27.3137 33.3137 30 30 30Z" fill="#1E1E1E"/>
                      </svg>
                      <img src="https://via.placeholder.com/120x120" alt={testimonial.author} />
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