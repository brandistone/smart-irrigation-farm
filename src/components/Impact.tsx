import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThirdSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (section && image && content) {
      // Parallax and reveal animations with slower, more deliberate motion
      gsap.fromTo(
        image,
        { 
          scale: 0.9, 
          opacity: 0.7,
          y: 50 
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5, // Increased duration
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%", // Starts earlier
            end: "bottom 20%", // Ends later
            scrub: 0.5, // Smoother scrubbing
            toggleActions: "play pause reverse reset"
          }
        }
      );

      gsap.fromTo(
        content,
        { 
          opacity: 0,
          x: -50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.5, // Increased duration
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%", // Starts earlier
            end: "bottom 20%", // Ends later
            scrub: 0.5, // Smoother scrubbing
            toggleActions: "play pause reverse reset"
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="panel flex-shrink-0 w-screen h-screen grid grid-cols-2 relative"
    >
      {/* Left Content */}
      <div 
        ref={contentRef}
        className="flex items-center justify-center p-16 bg-white opacity90"
      >
        <div className="max-w-xl">
          <div className="mb-6">
            <span className="text-blue-800 font-semibold uppercase tracking-wide">
              Our Approach
            </span>
            <h2 className="text-4xl font-bold mt-3 text-black">
            Innovative Technology Solutions for Agriculture
            </h2>
          </div>
          
          <p className="text-lg text-black mb-6">
          We combine cutting-edge technology, blockchain, and strategic insights to deliver transformative solutions that enhance modern irrigation and farming practices. Our approach ensures optimal resource management, increased productivity, and sustainable growth for the agricultural sector.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-300">
              <svg 
                className="w-6 h-6 text-blue-500 mr-3 group-hover:text-blue-700 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                />
              </svg>
              <span className="text-gray-700 group-hover:text-blue-900 transition-colors">
                Advanced Technology Integration
              </span>
            </div>
            <div className="flex items-center group cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-all duration-300">
              <svg 
                className="w-6 h-6 text-blue-500 mr-3 group-hover:text-blue-700 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
                />
              </svg>
              <span className="text-gray-700 group-hover:text-blue-900 transition-colors">
                Scalable Solutions
              </span>
            </div>
          </div>
          
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div 
        ref={imageRef}
        className="relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105" 
          style={{
            backgroundImage: "url('/images/Iot.jpg')",
            backgroundSize: 'cover',
            filter: 'brightness(0.9)'
          }}
        />
        <div className="absolute inset-0 " />
      </div>
    </section>
  );
};

export default ThirdSection;