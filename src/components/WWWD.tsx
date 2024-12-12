import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SquareData {
  id: number;
  src: string;
}

const shuffle = (array: SquareData[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData: SquareData[] = [
  {
    id: 1,
    src: "/images/bg.jpeg",
  },
  {
    id: 2,
    src: "/images/irrigation2.jpg",
  },
  {
    id: 3,
    src: "/images/irrigation3.jpg",
  },
  {
    id: 4,
    src: "/images/irrigation4.jpg",
  },
  {
    id: 5,
    src: "/images/irrigation5.jpg",
  },
  {
    id: 6,
    src: "/images/irrigation6.jpg",
  },
  {
    id: 7,
    src: "/images/irrigation7.jpg",
  },
  {
    id: 8,
    src: "/images/irrigation8.jpg",
  },
  {
    id: 9,
    src: "/images/irrigation9.jpg",
  },
  {
    id: 10,
    src: "/images/irrigation10.jpg",
  },
  {
    id: 11,
    src: "/images/irrigation11.jpg",
  },
  {
    id: 12,
    src: "/images/irrigation12.jpg",
  },
  {
    id: 13,
    src: "/images/irrigation13.jpg",
  },
  {
    id: 14,
    src: "/images/irrigation14.jpg",
  },
  {
    id: 15,
    src: "/images/irrigation15.jpg",
  },
  {
    id: 16,
    src: "/images/irrigation16.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div 
      key={sq.id} 
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
    >
      <div 
        style={{
          backgroundImage: `url(${sq.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          borderRadius: "8px"
        }}
      />
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSquares(generateSquares());
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-2 p-2 bg-gray-100 rounded-xl">
      {squares.map((sq, index) => (
        <React.Fragment key={index}>{sq}</React.Fragment>
      ))}
    </div>
  );
};

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium uppercase tracking-wide">
          Smart Irrigation Innovations
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight">
          Transforming Agriculture, Saving Water
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Our smart irrigation solutions have helped farmers across the globe 
          reduce water consumption by up to 50%, increase crop yields, and 
          create more sustainable agricultural practices through cutting-edge 
          IoT and AI technologies.
        </p>
        <div className="flex space-x-4 items-center">
          <button className="bg-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-all hover:bg-indigo-600 active:scale-95 shadow-md">
          <a 
            href="/contact" 
            className="text-white hover:text-indigo-800 transition-colors"
          >
           
            Explore Case Studies
            </a>
          </button>
          <a 
            href="/contact" 
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Contact Our Team →
          </a>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

export default ShuffleHero;