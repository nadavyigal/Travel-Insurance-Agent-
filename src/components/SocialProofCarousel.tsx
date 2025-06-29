import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SocialProofCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'שרה כהן',
      location: 'תל אביב',
      text: 'השירות של דקלה היה מעולה! קיבלתי הצעת מחיר תוך דקות והכיסוי היה מקיף. ממליצה בחום!',
      rating: 5,
      trip: 'טיול לאירופה',
    },
    {
      name: 'דוד לוי',
      location: 'חיפה',
      text: 'נתקלתי בבעיה רפואית בתאילנד והצוות של דקלה טיפל בהכל במהירות ובמקצועיות. תודה רבה!',
      rating: 5,
      trip: 'חופשה באסיה',
    },
    {
      name: 'מיכל אברהם',
      location: 'ירושלים',
      text: 'המחירים הכי טובים שמצאתי בשוק והשירות אישי ומקצועי. בהחלט אשתמש שוב!',
      rating: 5,
      trip: 'נסיעת עסקים לארה"ב',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-4">
            {t('socialProofTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentSlide * -100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 md:p-12 text-center">
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-lg md:text-xl text-gray-800 font-alef leading-relaxed mb-6">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-alef font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <div className="font-alef font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">{testimonial.location}</div>
                        <div className="text-sm text-primary-600 font-medium">
                          {testimonial.trip}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
            aria-label="Previous testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow z-10"
            aria-label="Next testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofCarousel;