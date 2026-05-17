import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface VictoryAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

const VictoryAnimation: React.FC<VictoryAnimationProps> = ({
  isVisible,
  onComplete,
}) => {
  useEffect(() => {
    if (isVisible) {
      // Launch confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ['#ff5a00', '#0066cc', '#ffcc00', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Racing flag confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.6 },
          colors: colors,
          shapes: ['square'],
        });
      }, 500);

      // Auto close after animation
      const timer = setTimeout(() => {
        onComplete();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none"
        >
          {/* Victory Lap Car */}
          <motion.div
            initial={{ x: '-100vw', rotate: 0 }}
            animate={{ x: '100vw', rotate: 360 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute text-9xl"
          >
            🏎️
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="relative z-10 text-center"
          >
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] p-12 rounded-3xl border-4 border-[#ffcc00] neon-yellow">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  delay: 1,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="text-8xl mb-4"
              >
                🏁
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="racing-font text-5xl text-[#ffcc00] mb-4"
              >
                Victory Lap!
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-xl text-white"
              >
                Sale Completed Successfully!
              </motion.p>

              {/* Racing Stripes */}
              <div className="mt-6 space-y-2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                  className="h-2 bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.7, duration: 0.3 }}
                  className="h-2 bg-gradient-to-r from-transparent via-[#0066cc] to-transparent rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Additional floating checkered flags */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 1, 1, 0],
                rotate: 360,
              }}
              transition={{
                delay: 1 + i * 0.2,
                duration: 2,
                ease: 'linear',
              }}
              className="absolute text-4xl"
            >
              🏁
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VictoryAnimation;
