import React, { useState } from 'react';
import { AnimalType } from './types';
import { ANIMALS } from './constants';
import CursorFollower from './components/CursorFollower';
import ControlPanel from './components/ControlPanel';

const App: React.FC = () => {
  const [currentAnimalType, setCurrentAnimalType] = useState<AnimalType>(AnimalType.CAT);
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);

  const currentAnimal = ANIMALS[currentAnimalType];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern for visual reference of movement */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }}></div>

      {/* Intro Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-0">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900/10 tracking-tight">
          Move your cursor
        </h1>
        <p className="mt-4 text-xl text-gray-900/10 font-medium">
          Your companion is following you
        </p>
      </div>

      {/* Application UI */}
      <ControlPanel 
        currentAnimal={currentAnimalType}
        onAnimalChange={setCurrentAnimalType}
        aiEnabled={aiEnabled}
        onAiToggle={setAiEnabled}
      />

      {/* The Star of the Show */}
      <CursorFollower 
        animal={currentAnimal}
        aiEnabled={aiEnabled}
      />

      {/* Footer Info */}
      <div className="fixed bottom-4 left-6 z-40 text-xs text-gray-400 pointer-events-auto">
        <p>Built with React, Tailwind & Gemini API</p>
      </div>
    </div>
  );
};

export default App;
