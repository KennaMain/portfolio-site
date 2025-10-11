import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  swipeThreshold?: number; // Minimum distance for swipe to trigger slide change
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showNavigation = true,
  swipeThreshold = 10, // pixels
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Touch event handlers
  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
      setIsDragging(true);
    },
    onTouchMove: (e: React.TouchEvent) => {
      if (!touchStart) return;
      setTouchEnd(e.targetTouches[0].clientX);
    },
    onTouchEnd: () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > swipeThreshold;
      const isRightSwipe = distance < -swipeThreshold;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setIsDragging(false);
      setTouchStart(null);
      setTouchEnd(null);
    },
  } 

  // Mouse event handlers for desktop dragging
  const mouseHandlers = {
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault();
      setTouchEnd(null);
      setTouchStart(e.clientX);
      setIsDragging(true);
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (!touchStart || !isDragging) return;
      setTouchEnd(e.clientX);
    },
    onMouseUp: () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > swipeThreshold;
      const isRightSwipe = distance < -swipeThreshold;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setIsDragging(false);
      setTouchStart(null);
      setTouchEnd(null);
    },
    onMouseEnter: () => {
      setIsHovered(true);
    },
    onMouseLeave: () => {
      setIsHovered(false);

      if (isDragging) {
        setIsDragging(false);
        setTouchStart(null);
        setTouchEnd(null);
      }
    }
  }

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, isDragging, isHovered]);

  // Calculate drag percentage for visual feedback
  const getDragPercentage = () => {
    if (!touchStart || !touchEnd) return 0;
    return ((touchStart - touchEnd) / (carouselRef.current?.offsetWidth || 1)) * 500;
  };

  const dragPercentage = getDragPercentage();

  return (
    <div 
      className="carousel"
      ref={carouselRef}
    >
      <div 
        className="carousel-container"
        {...touchHandlers}
        {...mouseHandlers}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="carousel-track"
          style={{ 
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? -dragPercentage : 0}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-in-out'
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