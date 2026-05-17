import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, event?: React.MouseEvent) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="h-full overflow-y-auto p-6 grid-glow">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-96 text-center"
        >
          <div className="text-6xl mb-4">🏁</div>
          <h3 className="racing-font text-2xl text-[#ff5a00] mb-2">
            No Cars Found
          </h3>
          <p className="text-[#999]">
            Try a different category or search term
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductGrid;
