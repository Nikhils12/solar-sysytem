import React from 'react';
import { X } from 'lucide-react';

interface PlanetFacts {
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
}

interface PlanetData {
  name: string;
  color: string;
  facts: PlanetFacts;
}

interface PlanetInfoProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  if (!planet) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white border border-white/20 shadow-2xl z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full" 
            style={{ backgroundColor: planet.color }}
          ></div>
          <h2 className="text-xl font-bold">{planet.name}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="bg-white/10 rounded-lg p-3">
          <span className="text-blue-300 text-sm font-medium">{planet.facts.type}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-gray-300">Diameter</div>
            <div className="font-semibold">{planet.facts.diameter}</div>
          </div>

          {planet.facts.distanceFromSun && (
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-gray-300">Distance</div>
              <div className="font-semibold">{planet.facts.distanceFromSun}</div>
            </div>
          )}

          {planet.facts.dayLength && (
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-gray-300">Day Length</div>
              <div className="font-semibold">{planet.facts.dayLength}</div>
            </div>
          )}

          {planet.facts.yearLength && (
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-gray-300">Year Length</div>
              <div className="font-semibold">{planet.facts.yearLength}</div>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-2">
            <div className="text-gray-300">Temperature</div>
            <div className="font-semibold">{planet.facts.temperature}</div>
          </div>

          {planet.facts.moons && (
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-gray-300">Moons</div>
              <div className="font-semibold">{planet.facts.moons}</div>
            </div>
          )}

          {planet.facts.age && (
            <div className="bg-white/5 rounded-lg p-2">
              <div className="text-gray-300">Age</div>
              <div className="font-semibold">{planet.facts.age}</div>
            </div>
          )}

          {planet.facts.composition && (
            <div className="bg-white/5 rounded-lg p-2 col-span-2">
              <div className="text-gray-300">Composition</div>
              <div className="font-semibold">{planet.facts.composition}</div>
            </div>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm leading-relaxed">{planet.facts.description}</p>
        </div>
      </div>
    </div>
  );
}