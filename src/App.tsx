import React, { useState } from 'react';
import SolarSystem from './components/SolarSystem';
import PlanetInfo from './components/PlanetInfo';
import Controls from './components/Controls';
import { Sparkles } from 'lucide-react';

// Planet data type for TypeScript
interface PlanetData {
  name: string;
  position: number[];
  size: number;
  color: string;
  rotationSpeed: number;
  orbitSpeed: number;
  orbitRadius: number;
  facts: {
    type: string;
    diameter: string;
    distanceFromSun?: string;
    dayLength?: string;
    yearLength?: string;
    temperature: string;
    moons?: string;
    age?: string;
    composition?: string;
    description: string;
  };
}

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
  };

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white border border-white/20 shadow-2xl">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-300" size={28} />
            Solar System Explorer
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Interactive 3D model of our solar system
          </p>
        </div>
      </div>

      {/* Main 3D Scene */}
      <div className="w-full h-screen">
        <SolarSystem 
          selectedPlanet={selectedPlanet}
          onPlanetSelect={handlePlanetSelect}
        />
      </div>

      {/* Planet Information Panel */}
      <PlanetInfo 
        planet={selectedPlanet}
        onClose={handleCloseInfo}
      />

      {/* Controls Guide */}
      <Controls />

      {/* Welcome message */}
      {!selectedPlanet && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 pointer-events-none">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-md">
            <h2 className="text-xl font-bold mb-2">Welcome to Space!</h2>
            <p className="text-sm text-gray-300">
              Click on any planet to learn fascinating facts about it. Use your mouse to navigate around the solar system.
            </p>
          </div>
        </div>
      )}

      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;