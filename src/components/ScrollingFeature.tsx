import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { useNavigate } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Observer);

const HorizontalScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const secondSectionCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      const sections = gsap.utils.toArray('.panel', containerRef.current) as HTMLElement[];
      const sectionCount = sections.length;

      // Horizontal scroll animation
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sectionCount - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.3,
          snap: 1 / (sectionCount - 1),
          end: () => `+=${sectionCount * 100}%`,
          invalidateOnRefresh: true,
        },
      });

      // Second section card animation
      if (secondSectionCardRef.current) {
        gsap.fromTo(
          secondSectionCardRef.current,
          {
            x: '100%',
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: sections[1],
              start: 'left center',
              end: 'right center',
              scrub: 0.3,
              containerAnimation: scrollTween,
            },
          }
        );
      }

      return () => {
        scrollTween.scrollTrigger?.kill();
      };
    }
  }, []);

  return (
    <div className="relative">
      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden overflow-y-hidden h-screen w-screen relative"
      >
        {/* First Section */}
        <div className="panel w-screen h-screen flex-shrink-0 relative grid grid-cols-2">
          {/* Background Image */}
          <div className="w-full h-full absolute inset-0 z-0 opacity-160">
            <img
              src="/images/Section5.jpg"
              alt="Residential Garden Irrigation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          {/* Text Container */}
          <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-5 text-white p-16 z-10 relative">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-6">
                Smart Crop Monitoring Made Simple
              </h2>
              <p className="text-xl mb-6">
                Revolutionize your agricultural management with our cutting-edge IoT
                technology. Monitor crop moisture, water quantity, and environmental
                conditions in real-time directly from your smartphone.
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="panel w-screen h-screen flex-shrink-0 relative overflow-hidden flex items-center">
          {/* Background Image */}
          <img
            src="/images/section3.jpg"
            alt="Smart Irrigation Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Text Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-start px-16">
            <div className="max-w-lg text-white">
              <h2 className="text-4xl font-bold mb-4">
                Solar-Powered Smart Irrigation
              </h2>
              <p className="text-lg mb-6">
                Experience the perfect synergy of solar energy, smart irrigation, and IoT
                technology. Automate your irrigation systems while monitoring and optimizing
                water usage for maximum efficiency and sustainability.
              </p>

              {/* Animated Button */}
              <button
                className="bg-green-900 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                onClick={() => navigate('/learn-more')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Third Section */}
        <div className="panel w-screen h-screen flex-shrink-0 relative">
          <img
            src="/images/tr.avif"
            alt="Technology Overview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 w-full h-full flex items-center justify-start px-16 bg-lime-950 opacity-60">
            <div className="max-w-lg text-white">
              <h2 className="text-4xl font-bold mb-6">
                Moving Beyond Traditional Irrigation
              </h2>
              <p className="text-lg mb-4">
                Traditional irrigation methods, while longstanding, come with significant downsides. 
              </p>
              <p className="text-lg">
                Our advanced irrigation solutions address these issues, ensuring water is used efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Fourth Section */}
        <div className="panel w-screen h-screen flex-shrink-0 relative flex items-center justify-center">
          <img
            src="/images/tt.webp"
            alt="Contact Us"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Irrigation?
            </h2>
            <button
              className="bg-green-950 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => navigate('/contact')}
            >
              Discover How Smart Irrigation Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;