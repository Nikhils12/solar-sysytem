import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Planet data with realistic information
const planetsData = [
  {
    name: 'Sun',
    position: [0, 0, 0],
    size: 2,
    color: '#FDB813',
    rotationSpeed: 0.01,
    orbitSpeed: 0,
    orbitRadius: 0,
    facts: {
      type: 'Star',
      diameter: '1.39 million km',
      temperature: '5,778 K surface',
      age: '4.6 billion years',
      composition: 'Hydrogen (73%), Helium (25%)',
      description: 'The Sun is the star at the center of our Solar System. It contains 99.86% of the system\'s mass.'
    }
  },
  {
    name: 'Mercury',
    position: [4, 0, 0],
    size: 0.2,
    color: '#8C7853',
    rotationSpeed: 0.02,
    orbitSpeed: 0.008,
    orbitRadius: 4,
    facts: {
      type: 'Terrestrial Planet',
      diameter: '4,879 km',
      distanceFromSun: '57.9 million km',
      dayLength: '58.6 Earth days',
      yearLength: '88 Earth days',
      temperature: '427°C day, -173°C night',
      moons: '0',
      description: 'Mercury is the smallest planet and closest to the Sun. It has extreme temperature variations.'
    }
  },
  {
    name: 'Venus',
    position: [6, 0, 0],
    size: 0.4,
    color: '#FFC649',
    rotationSpeed: -0.015,
    orbitSpeed: 0.006,
    orbitRadius: 6,
    facts: {
      type: 'Terrestrial Planet',
      diameter: '12,104 km',
      distanceFromSun: '108.2 million km',
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
      temperature: '462°C surface',
      moons: '0',
      description: 'Venus is the hottest planet due to its thick atmosphere. It rotates backwards compared to most planets.'
    }
  },
  {
    name: 'Earth',
    position: [8, 0, 0],
    size: 0.4,
    color: '#6B93D6',
    rotationSpeed: 0.02,
    orbitSpeed: 0.005,
    orbitRadius: 8,
    facts: {
      type: 'Terrestrial Planet',
      diameter: '12,756 km',
      distanceFromSun: '149.6 million km',
      dayLength: '24 hours',
      yearLength: '365.25 days',
      temperature: '15°C average',
      moons: '1 (Moon)',
      description: 'Earth is the only known planet to harbor life. It has liquid water and a protective atmosphere.'
    }
  },
  {
    name: 'Mars',
    position: [10, 0, 0],
    size: 0.3,
    color: '#CD5C5C',
    rotationSpeed: 0.018,
    orbitSpeed: 0.004,
    orbitRadius: 10,
    facts: {
      type: 'Terrestrial Planet',
      diameter: '6,792 km',
      distanceFromSun: '227.9 million km',
      dayLength: '24.6 hours',
      yearLength: '687 Earth days',
      temperature: '-65°C average',
      moons: '2 (Phobos, Deimos)',
      description: 'Mars is known as the Red Planet due to iron oxide on its surface. It has the largest volcano in the solar system.'
    }
  },
  {
    name: 'Jupiter',
    position: [14, 0, 0],
    size: 1,
    color: '#D8CA9D',
    rotationSpeed: 0.04,
    orbitSpeed: 0.002,
    orbitRadius: 14,
    facts: {
      type: 'Gas Giant',
      diameter: '142,984 km',
      distanceFromSun: '778.5 million km',
      dayLength: '9.9 hours',
      yearLength: '11.9 Earth years',
      temperature: '-110°C average',
      moons: '95+ (Io, Europa, Ganymede, Callisto)',
      description: 'Jupiter is the largest planet. Its Great Red Spot is a storm larger than Earth that has raged for centuries.'
    }
  },
  {
    name: 'Saturn',
    position: [18, 0, 0],
    size: 0.8,
    color: '#FAD5A5',
    rotationSpeed: 0.035,
    orbitSpeed: 0.0015,
    orbitRadius: 18,
    facts: {
      type: 'Gas Giant',
      diameter: '120,536 km',
      distanceFromSun: '1.43 billion km',
      dayLength: '10.7 hours',
      yearLength: '29.4 Earth years',
      temperature: '-140°C average',
      moons: '146+ (Titan, Enceladus, Mimas)',
      description: 'Saturn is famous for its prominent ring system made of ice and rock particles.'
    }
  },
  {
    name: 'Uranus',
    position: [22, 0, 0],
    size: 0.6,
    color: '#4FD0E3',
    rotationSpeed: 0.025,
    orbitSpeed: 0.001,
    orbitRadius: 22,
    facts: {
      type: 'Ice Giant',
      diameter: '51,118 km',
      distanceFromSun: '2.87 billion km',
      dayLength: '17.2 hours',
      yearLength: '83.7 Earth years',
      temperature: '-195°C average',
      moons: '27+ (Miranda, Ariel, Umbriel)',
      description: 'Uranus rotates on its side and has a faint ring system. It appears blue-green due to methane in its atmosphere.'
    }
  },
  {
    name: 'Neptune',
    position: [26, 0, 0],
    size: 0.6,
    color: '#4B70DD',
    rotationSpeed: 0.03,
    orbitSpeed: 0.0008,
    orbitRadius: 26,
    facts: {
      type: 'Ice Giant',
      diameter: '49,528 km',
      distanceFromSun: '4.50 billion km',
      dayLength: '16.1 hours',
      yearLength: '163.7 Earth years',
      temperature: '-200°C average',
      moons: '16+ (Triton, Nereid, Proteus)',
      description: 'Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 km/h.'
    }
  }
];

interface PlanetProps {
  planet: typeof planetsData[0];
  onClick: (planet: typeof planetsData[0]) => void;
  isSelected: boolean;
}

function Planet({ planet, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y += planet.rotationSpeed;
    }

    if (orbitRef.current && planet.orbitRadius > 0) {
      orbitRef.current.rotation.y = time * planet.orbitSpeed;
    }
  });

  const ringGeometry = new THREE.RingGeometry(planet.orbitRadius - 0.05, planet.orbitRadius + 0.05, 64);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide
  });

  return (
    <group ref={orbitRef}>
      {planet.orbitRadius > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={ringGeometry} />
          <primitive object={ringMaterial} />
        </mesh>
      )}
      
      <mesh
        ref={meshRef}
        position={planet.position}
        onClick={(e) => {
          e.stopPropagation();
          onClick(planet);
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered || isSelected ? 1.2 : 1}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          emissive={planet.name === 'Sun' ? planet.color : '#000000'}
          emissiveIntensity={planet.name === 'Sun' ? 0.3 : 0}
        />
        
        {isSelected && (
          <Html distanceFactor={10}>
            <div className="pointer-events-none">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse transform -translate-x-1 -translate-y-1"></div>
            </div>
          </Html>
        )}

        {(hovered || isSelected) && (
          <Html distanceFactor={15}>
            <div className="pointer-events-none transform -translate-x-1/2 -translate-y-8">
              <div className="bg-white/10 backdrop-blur-md text-white px-2 py-1 rounded text-sm font-medium border border-white/20">
                {planet.name}
              </div>
            </div>
          </Html>
        )}
      </mesh>

      {planet.name === 'Saturn' && (
        <mesh position={planet.position} rotation={[Math.PI / 6, 0, 0]}>
          <ringGeometry args={[planet.size * 1.2, planet.size * 2, 32]} />
          <meshStandardMaterial color="#D4AF37" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const positions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200;
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial color="#ffffff" size={0.1} sizeAttenuation transparent />
    </points>
  );
}

interface SolarSystemProps {
  selectedPlanet: typeof planetsData[0] | null;
  onPlanetSelect: (planet: typeof planetsData[0]) => void;
}

export default function SolarSystem({ selectedPlanet, onPlanetSelect }: SolarSystemProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 10, 30], fov: 75 }}>
        <color attach="background" args={['#000011']} />
        <Stars />
        
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={100}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
        
        {planetsData.map((planet) => (
          <Planet
            key={planet.name}
            planet={planet}
            onClick={onPlanetSelect}
            isSelected={selectedPlanet?.name === planet.name}
          />
        ))}
      </Canvas>
    </div>
  );
}