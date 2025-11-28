import React from 'react';
import { AnimalType, AnimalConfig } from '../types';
import { ANIMALS } from '../constants';
import { Settings, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ControlPanelProps {
  currentAnimal: AnimalType;
  onAnimalChange: (type: AnimalType) => void;
  aiEnabled: boolean;
  onAiToggle: (enabled: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentAnimal,
  onAnimalChange,
  aiEnabled,
  onAiToggle,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 text-gray-700 interactive"
        aria-label="Toggle Settings"
      >
        {isOpen ? <X size={24} /> : <Settings size={24} />}
      </button>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-72 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-5 interactive"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Companion</h2>
              <p className="text-sm text-gray-500">Choose your cursor friend</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.values(ANIMALS).map((animal) => (
                <button
                  key={animal.type}
                  onClick={() => onAnimalChange(animal.type)}
                  className={`
                    aspect-square rounded-xl flex items-center justify-center text-3xl
                    transition-all duration-200 border-2
                    ${currentAnimal === animal.type 
                      ? `${animal.color} ${animal.borderColor} scale-105 shadow-md` 
                      : 'bg-gray-50 border-transparent hover:bg-gray-100 hover:scale-105'}
                  `}
                  title={animal.type}
                >
                  {animal.emoji}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-5 h-5 ${aiEnabled ? 'text-purple-500' : 'text-gray-400'}`} />
                  <div>
                    <h3 className="font-semibold text-gray-800">AI Thoughts</h3>
                    <p className="text-xs text-gray-500">Powered by Gemini</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onAiToggle(!aiEnabled)}
                  className={`
                    w-12 h-7 rounded-full transition-colors duration-300 relative focus:outline-none
                    ${aiEnabled ? 'bg-purple-500' : 'bg-gray-300'}
                  `}
                >
                  <motion.div
                    animate={{ x: aiEnabled ? 22 : 2 }}
                    className="absolute top-1 left-0 w-5 h-5 bg-white rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                When enabled, your companion will occasionally react to your movements and clicks using Google Gemini.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlPanel;
