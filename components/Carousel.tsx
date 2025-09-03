

import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
    image: string;
    title: string;
    subtitle: string;
}

interface CarouselProps {
    slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, [slides.length]);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
            <div className="w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                            <h2 className="text-white text-2xl md:text-4xl font-bold">{slide.title}</h2>
                            <p className="text-white text-sm md:text-lg mt-2">{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;