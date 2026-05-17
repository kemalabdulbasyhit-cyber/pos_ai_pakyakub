import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddToCartAnimationProps {
  productImage: string;
  fromPosition: { x: number; y: number };
  toPosition: { x: number; y: number };
  onComplete: () => void;
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({
  productImage,
  fromPosition,
  toPosition,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const deltaX = toPosition.x - fromPosition.x;
  const deltaY = toPosition.y - fromPosition.y;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Flying Product */}
          <motion.div
            initial={{
              position: 'fixed',
              left: fromPosition.x,
              top: fromPosition.y,
              scale: 1,
              opacity: 1,
              zIndex: 9999,
            }}
            animate={{
              left: toPosition.x,
              top: toPosition.y,
              scale: 0.2,
              opacity: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-6xl pointer-events-none"
          >
            {productImage}
          </motion.div>

          {/* Speed Trail Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                position: 'fixed',
                left: fromPosition.x + 30,
                top: fromPosition.y + 30,
                opacity: 1,
              }}
              animate={{
                left: fromPosition.x + (deltaX * (i + 1)) / 10,
                top: fromPosition.y + (deltaY * (i + 1)) / 10,
                opacity: 0,
                scale: [1, 1.5, 0],
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
              className="w-2 h-2 rounded-full bg-[#ff5a00] pointer-events-none"
              style={{ zIndex: 9998 }}
            />
          ))}

          {/* Motion Blur Lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              initial={{
                position: 'fixed',
                left: fromPosition.x,
                top: fromPosition.y + i * 10,
                width: 0,
                height: 2,
                opacity: 0.8,
              }}
              animate={{
                width: [0, 100, 0],
                opacity: [0, 0.8, 0],
                left: fromPosition.x + (deltaX * (i + 3)) / 8,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
              }}
              className="bg-gradient-to-r from-[#ff5a00] to-transparent pointer-events-none"
              style={{ zIndex: 9997 }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export default AddToCartAnimation;
