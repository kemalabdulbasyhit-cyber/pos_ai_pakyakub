import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a] carbon-fiber"
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-9xl mb-8"
        >
          🏎️
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="racing-font text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffcc00] to-[#ff5a00]"
        >
          Hot Wheels POS
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#999] text-lg mb-8"
        >
          Race to the Checkout!
        </motion.p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="h-3 bg-[#2a2a2a] rounded-full overflow-hidden chrome-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffcc00] to-[#0066cc] neon-orange"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 text-[#ffcc00] font-bold text-lg digit-display"
          >
            {progress}%
          </motion.div>
        </div>

        {/* Speed Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 200, opacity: [0, 1, 0] }}
            transition={{
              duration: 1,
              delay: 0.8 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute left-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent"
            style={{ top: `${50 + i * 3}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
