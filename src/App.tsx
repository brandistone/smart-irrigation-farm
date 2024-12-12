import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import HorizontalScrollSection from './components/ScrollingFeature';
import ThirdSection from './components/Impact';
import ShuffleHero from './components/WWWD';
import TextParallaxContentExample from './components/Projects';

import Chatbot from './pages/Chatbot';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/scrollingfeature" element={<HorizontalScrollSection />} />
          <Route path="/impact" element={<ThirdSection />} />
          <Route path="/wwwd" element={<ShuffleHero />} />
          <Route path="/project" element={<TextParallaxContentExample />} />
          <Route path='/user-profile'element={<UserProfile />} />
          
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
