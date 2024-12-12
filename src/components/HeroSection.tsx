import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  Home,
  Package,
  LayoutDashboard,
  User2Icon,
  MoreHorizontalIcon,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import HorizontalScrollSection from "./ScrollingFeature";
import ThirdSection from "./Impact";
import ShuffleHero from "./WWWD";
import TextParallaxContentExample from "./Projects";

const HeroSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dropdown, setDropdown] = useState<{ [key: number]: boolean }>({});
  const [dropdownTimeout, setDropdownTimeout] = useState<number | null>(null);
  const navigate = useNavigate();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      subItems: [], 
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: null, 
      subItems: [
        { label: 'Overview', path: '/nft-tokens/overview' },
        { label: 'Stats', path: '/nft-tokens/stats' },
        { label: 'Analytics', path: '/nft-tokens/analytics' },
      ],
    },
    {
      icon: Package,
      label: "Product",
      path: null, 
      subItems: [
        { label: 'New Arrivals', path: '/marketplace/new' },
        { label: 'Best Sellers', path: '/marketplace/best-sellers' },
      ],
    },
    {
      icon: User2Icon,
      label: "User Profile",
      path: null, 
      subItems: [
        { label: 'Settings', path: '/about/settings' },
        { label: 'Logout', path: '/logout' },
      ],
    },
    {
      icon: MoreHorizontalIcon,
      label: "More",
      path: "#",
      isAction: true,
      subItems: [], 
    },
  ];

  const handleNavigation = (path: string | null, isAction?: boolean): void => {
    if (isAction) {
      console.log("Wallet connection clicked");
      return;
    }
    if (path) {
      navigate(path);
      setIsExpanded(false);
    }
  };

  const handleMouseEnter = (index: number): void => {
    if (dropdownTimeout !== null) {
      clearTimeout(dropdownTimeout);
    }
    setDropdown((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number): void => {
    if (dropdownTimeout !== null) {
      clearTimeout(dropdownTimeout);
    }
    const timeout = setTimeout(() => {
      setDropdown((prev) => ({ ...prev, [index]: false }));
    }, 300);
    setDropdownTimeout(timeout as unknown as number);
  };

  return (
    <motion.div>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="fixed top-0 left-0 w-full bg-gradient-to-r from-lime-950 to-lime-500 text-white p-4 z-50 shadow-lg"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold flex items-center"
            >
              MABEYA
            </motion.div>
          </Link>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <motion.button
                  onClick={() =>
                    item.subItems.length
                      ? null
                      : handleNavigation(item.path, item.isAction)
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center hover:text-gray-400 transition"
                >
                  <item.icon className="mr-2" size={20} />
                  {item.label}
                </motion.button>
                {/* Dropdown Menu */}
                {item.subItems.length > 0 && dropdown[index] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 bg-lime-800 text-white rounded shadow-lg mt-2"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
          >
            {isExpanded ? "✕" : "☰"}
          </motion.button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-gray-900 absolute left-0 right-0 top-full"
          >
            {navItems.map((item, index) => (
              <motion.div key={index} className="relative">
                <button
                  onClick={() =>
                    item.subItems.length
                      ? null
                      : handleNavigation(item.path, item.isAction)
                  }
                  className="w-full text-left p-4 hover:bg-gray-800 flex items-center"
                >
                  <item.icon className="mr-4" />
                  {item.label}
                </button>
                {/* Dropdown Menu for Mobile */}
                {item.subItems.length > 0 && dropdown[index] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 text-white rounded shadow-lg"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.div className="relative w-full min-h-screen flex flex-col items-center justify-center">
        <video
          autoPlay loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src={`${process.env.PUBLIC_URL}/videos/bg3.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <motion.div
          className="relative z-10 text-center p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Revolutionizing agriculture with smart irrigation
          </h1>
          <p className="text-2xl text-white mb-8">
            Harnessing IoT for water efficiency, higher yields, and sustainable
            farming practices.
          </p>
          <Link to="/user-profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-950 transition"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="min-h-screen overflow-y-hidden overflow-x-hidden">
        <ThirdSection />
      </div>

      <div className="min-h-screen overflow-y-hidden overflow-x-hidden">
        <HorizontalScrollSection />
      </div>

      <div className="min-h-screen overflow-y-hidden overflow-x-hidden">
        <ShuffleHero />
      </div>

      <div className="min-h-screen overflow-y-hidden overflow-x-hidden">
        <TextParallaxContentExample />
      </div>

      {/* Sticky Image Section */}
      <motion.div
        className="relative w-full min-h-screen flex flex-row bg-white opacity-25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sticky Image Section */}
        <div className="md:w-1/2 h-screen sticky top-0 flex items-center justify-center">
          <motion.img
            key="sticky-image"
            src={`/images/bg.jpeg`} // Default image
            alt="Dynamic Sticky"
            className="w-full h-full object-cover rounded-lg shadow-lg transition-all duration-500"
            id="dynamic-image"
          />
        </div>

        {/* Scrollable Text Section */}
        <div className="md:w-1/2 flex flex-col space-y-32 p-8 overflow-y-auto h-full">
          {[
            {
              heading: "Efficient Irrigation",
              description:
                "Optimizing water usage with advanced smart irrigation systems for healthier crops and higher yields. Our systems integrate real-time data collection to monitor soil moisture levels accurately. Farmers can receive instant feedback on when and how much to irrigate, minimizing water waste. This proactive approach ensures that crops receive the right amount of water at the right time. As a result, farmers achieve better crop growth, increased productivity, and long-term sustainability.",
              image: "/images/bg2.avif",
            },
            {
              heading: "AI-Powered Analytics",
              description:
                "Harnessing AI to analyze farm data, predict watering needs, and optimize agricultural performance. Our technology processes large datasets from various sources, including weather forecasts, soil sensors, and historical data. It uses machine learning algorithms to generate actionable insights and predict the optimal times for irrigation and nutrient distribution. This helps farmers make informed decisions that maximize output and conserve resources. AI-driven analytics lead to a more efficient use of water and inputs, boosting both yields and sustainability.",
              image: "/images/bg3.webp",
            },
            {
              heading: "IoT Monitoring",
              description:
                "Real-time monitoring of soil moisture, temperature, and humidity using IoT devices for precision farming. IoT sensors provide continuous updates, ensuring farmers have up-to-date information about the condition of their crops and soil. This data is then relayed to an accessible dashboard that farmers can view on their mobile devices or computers. The system is designed to alert farmers when parameters fall outside optimal ranges, enabling quick action. With IoT monitoring, farmers can respond faster, avoid crop damage, and improve overall farm efficiency.",
              image: "/images/bg.jpeg",
            },
            {
              heading: "Sustainable Practices",
              description:
                "Promoting eco-friendly farming practices that balance growth and environmental preservation. Our irrigation systems use water more efficiently, ensuring that less water is lost to runoff and evaporation. We prioritize practices that enhance soil health, reduce chemical usage, and minimize waste. This approach benefits the environment by supporting biodiversity and conserving natural resources. By implementing these sustainable methods, farmers can enjoy a more resilient ecosystem and contribute positively to global efforts against climate change.",
              image: "/images/bg2.avif",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col min-h-screen justify-center items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
              onViewportEnter={() => {
                const imageElement = document.getElementById("dynamic-image");
                if (imageElement) {
                  imageElement.setAttribute("src", item.image);
                }
              }}
            >
              <h3 className="text-4xl font-bold text-black mb-6">{item.heading}</h3>
              <p className="text-xl text-black mb-8 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer Section */}
      <footer className="w-full py-4 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </motion.div>
  );
};

export default HeroSection;