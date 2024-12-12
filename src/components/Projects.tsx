"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Boxes } from "./ui/background-boxes";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: React.ReactNode;
}

interface StickyImageProps {
  imgUrl: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

const IMG_PADDING = 0;

export const TextParallaxContentExample: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Background with opacity */}
      <div className="absolute inset-0 bg-lime-500 opacity-15 pointer-events-none"></div>

      {/* Background boxes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
        <Boxes />
      </div>

      {/* Content */}
      <div className="relative z-20">
        <TextParallaxContent
          imgUrl="/images/bg.jpeg"
          subheading="Transforming Agriculture"
          heading="Blockchain-Driven Smart Irrigation."
        >
          <div className="flex flex-col items-center justify-center">
            <p className="mb-6 text-xl text-black md:text-2xl text-center">
              Blockchain technology combined with smart irrigation is
              transforming agriculture by making it more efficient, sustainable,
              and profitable. By using secure, decentralized systems, farmers
              can track data, share information, and automate irrigation based
              on real-time needs, leading to better water management and
              increased crop yields.
            </p>

            
            <button
              className="rounded mb-80 bg-green-950 px-6 py-3 text-white transition hover:bg-green-500"
              onClick={() => navigate("/agriculture")}
            >
              Explore More
            </button>
          </div>
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Quality"
          heading="Never compromise."
        >
          <div className="flex flex-col items-center justify-center">
            <p className="mb-4 text-xl text-black text-center">
              High standards lead to better outcomes—experience the difference.
            </p>
            <button
              className="rounded bg-green-950 px-6 py-3 text-white transition hover:bg-green-500"
              onClick={() => navigate("/quality")}
            >
              Learn About Quality
            </button>
          </div>
        </TextParallaxContent>
      </div>
    </div>
  );
};

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
        marginBottom: 0,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <div className="relative flex flex-col items-center justify-center h-screen px-4">
        <div className="max-w-[800px] text-center">{children}</div>
      </div>
    </div>
  );
};

const StickyImage: React.FC<StickyImageProps> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<OverlayCopyProps> = ({ subheading, heading }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-white px-4"
    >
      <div className="max-w-[800px] text-center">
        <p className="mb-2 text-xl md:mb-4 md:text-3xl">{subheading}</p>
        <p className="text-4xl font-bold md:text-7xl">{heading}</p>
      </div>
    </motion.div>
  );
};

export default TextParallaxContentExample;
