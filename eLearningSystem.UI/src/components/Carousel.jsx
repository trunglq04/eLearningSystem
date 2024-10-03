import React, { useEffect, useState } from "react";
import carouselBanner1 from "../assets/carouselBanner1.jpg";
import carouselBanner2 from "../assets/carouselBanner2.png";
import carouselBanner3 from "../assets/carouselBanner3.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [carouselBanner1, carouselBanner2, carouselBanner3];

  const handlePrevious = () => {
    setFade(false);
    setTimeout(() => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setFade(true);
    }, 300);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const autoSlide = setInterval(handleNext, 5000);
    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  return (
    <div className="relative w-full mx-auto">
      {/* Images */}
      <div className="w-full h-4/5 bg-gray-300 overflow-hidden ">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={`w-full h-full object-fill transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        ❯
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
