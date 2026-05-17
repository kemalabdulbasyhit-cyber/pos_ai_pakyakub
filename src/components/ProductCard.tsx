import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency, getRarityColor, getRarityLabel } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, event?: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    onAddToCart(product, e);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, rotateX: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div
        className={`
          relative p-4 rounded-xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]
          border-2 transition-all-smooth overflow-hidden
          ${
            isHovered
              ? 'border-[#ff5a00] neon-orange-intense'
              : 'border-[#3a3a3a]'
          }
        `}
      >
        {/* Rarity Badge */}
        <div className="absolute top-2 right-2 z-10">
          <div
            className={`
              px-2 py-1 rounded-md text-xs font-bold text-white
              ${getRarityColor(product.rarity)}
            `}
          >
            {getRarityLabel(product.rarity)}
          </div>
        </div>

        {/* Product Image with Hover Effect */}
        <div className="relative mb-4 h-32 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="text-6xl"
          >
            {product.image}
          </motion.div>

          {/* Speed Lines Effect on Hover */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: -100, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="absolute left-full w-20 h-0.5 bg-gradient-to-l from-[#ff5a00] to-transparent"
                  style={{ top: `${40 + i * 20}%` }}
                />
              ))}
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2 mb-4">
          <h3 className="font-bold text-white text-lg leading-tight">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#999] font-mono">
              {product.toyNumber}
            </span>
            {product.series && (
              <span className="text-xs text-[#0066cc] font-semibold">
                {product.series}
              </span>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-[#ff5a00] digit-display">
                {formatCurrency(product.price)}
              </div>
              {product.year && (
                <div className="text-xs text-[#666]">
                  {product.year}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className={`
            w-full py-3 rounded-lg font-bold text-white
            bg-gradient-to-r from-[#ff5a00] to-[#ff7a30]
            hover:from-[#ff7a30] hover:to-[#ff5a00]
            transition-all-smooth btn-press
            flex items-center justify-center gap-2
            ${isHovered ? 'neon-orange' : ''}
          `}
        >
          <Plus size={20} />
          <span>Add to Cart</span>
        </motion.button>

        {/* Shine Effect */}
        {isHovered && (
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        )}

        {/* Corner Accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div
            className={`
              absolute bottom-0 right-0 w-20 h-20
              border-r-2 border-b-2 rounded-br-xl
              transition-all-smooth
              ${isHovered ? 'border-[#ffcc00]' : 'border-[#3a3a3a]'}
            `}
            style={{ transform: 'rotate(0deg)' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
