import React, { useState, useEffect } from 'react';
import './Carousel.css';

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showNavigation = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  return (
    <div className="carousel">
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)` 
          }}
        >
          {items.map((item, index) => (
            <div 
              key={index}
              className="carousel-slide"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showNavigation && items.length > 1 && (
        <>
          <button 
            className="carousel-button carousel-button-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            className="carousel-button carousel-button-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${
                index === currentIndex ? 'carousel-indicator-active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;