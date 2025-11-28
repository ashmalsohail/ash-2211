import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { AnimalConfig } from '../types';
import { generateAnimalThought } from '../services/geminiService';

interface CursorFollowerProps {
  animal: AnimalConfig;
  aiEnabled: boolean;
}

const CursorFollower: React.FC<CursorFollowerProps> = ({ animal, aiEnabled }) => {
  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth following
  // Stiffness: higher = faster snap
  // Damping: higher = less bounce
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Rotation based on movement velocity
  const [rotation, setRotation] = useState(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

  // Thoughts state
  const [thought, setThought] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const thoughtTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track mouse movement globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Calculate rotation based on direction
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      
      // Only rotate if significant movement
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
         // Calculate angle in degrees
         // We add 90 degrees because 0 degrees is usually "right", but we want to adjust based on orientation
         // Ideally, we want a slight tilt, not full rotation 360 unless it's top-down.
         // Let's just tilt based on X velocity for a "lean" effect.
         const tilt = Math.max(Math.min(dx * 2, 25), -25);
         setRotation(tilt);
      }

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle click events (interaction)
  useEffect(() => {
    const handleClick = async () => {
      // Animation trigger (jump)
      // Implementation simplified via key prop in render if needed, or imperative animation
      
      // AI Thought Trigger
      if (aiEnabled && !isThinking) {
        setIsThinking(true);
        const newThought = await generateAnimalThought(animal, "clicked the mouse");
        setThought(newThought);
        setIsThinking(false);

        // Clear thought after 4 seconds
        if (thoughtTimeoutRef.current) clearTimeout(thoughtTimeoutRef.current);
        thoughtTimeoutRef.current = setTimeout(() => {
          setThought(null);
        }, 4000);
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [aiEnabled, animal, isThinking]);

  // Periodic random thoughts if AI enabled
  useEffect(() => {
    if (!aiEnabled) return;

    const intervalId = setInterval(async () => {
      if (isThinking || thought) return; // Don't interrupt or overlap

      if (Math.random() > 0.7) { // 30% chance every interval
        setIsThinking(true);
        const newThought = await generateAnimalThought(animal, "moved the cursor randomly");
        setThought(newThought);
        setIsThinking(false);

        if (thoughtTimeoutRef.current) clearTimeout(thoughtTimeoutRef.current);
        thoughtTimeoutRef.current = setTimeout(() => {
          setThought(null);
        }, 4000);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId);
  }, [aiEnabled, animal, isThinking, thought]);


  return (
    <>
      {/* The Follower */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotate: rotation,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none', // Let clicks pass through to elements below
          zIndex: 9999,
          // Offset so the cursor tip is near the animal but not covered
          translateX: '10px',
          translateY: '10px',
        }}
        className="flex flex-col items-center"
      >
        {/* Thought Bubble */}
        {thought && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full mb-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-200 text-sm font-medium text-gray-800 whitespace-nowrap max-w-xs text-wrap text-center"
          >
            {thought}
            {/* Little triangle pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white" />
          </motion.div>
        )}

        {/* Loading Bubble */}
        {isThinking && !thought && (
             <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: -10 }}
             className="absolute bottom-full mb-2 px-2 py-1 bg-white/80 rounded-full shadow-sm"
           >
             <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
             </span>
           </motion.div>
        )}

        {/* The Animal Avatar */}
        <div 
          className={`
            w-16 h-16 rounded-full flex items-center justify-center 
            text-4xl shadow-xl backdrop-blur-sm border-4 
            ${animal.color} ${animal.borderColor}
            transition-colors duration-300
          `}
        >
          {animal.emoji}
        </div>
      </motion.div>
      
      {/* Custom 'real' cursor replacement dot for precision */}
      <motion.div 
        style={{ x: mouseX, y: mouseY, position: 'fixed', top: -4, left: -4, pointerEvents: 'none', zIndex: 10000 }}
        className="w-2 h-2 bg-black rounded-full shadow-sm ring-1 ring-white"
      />
    </>
  );
};

export default CursorFollower;