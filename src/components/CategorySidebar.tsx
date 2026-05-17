import { motion } from 'framer-motion';
import { categories } from '../data/products';

interface CategorySidebarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="carbon-fiber h-full p-4 border-r-2 border-[#ff5a00]/30 flex flex-col gap-3">
      <div className="mb-6">
        <h2 className="racing-font text-2xl text-[#ff5a00] mb-2">
          Categories
        </h2>
        <div className="h-1 w-full bg-gradient-to-r from-[#ff5a00] via-[#ffcc00] to-transparent rounded-full"></div>
      </div>

      <div className="flex flex-col gap-2">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(category.id)}
              className={`
                relative p-4 rounded-lg transition-all-smooth btn-press
                ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#ff5a00] to-[#ff7a30] neon-orange-intense'
                    : 'bg-[#2a2a2a] hover:bg-[#333333] chrome-border'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <div className="text-left flex-1">
                  <div
                    className={`
                      font-bold text-sm
                      ${isSelected ? 'text-white' : 'text-[#cccccc]'}
                    `}
                  >
                    {category.name}
                  </div>
                </div>
              </div>
              
              {isSelected && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ffcc00] rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Decorative Racing Stripe */}
      <div className="mt-auto pt-6">
        <div className="h-2 w-full bg-gradient-to-r from-transparent via-[#0066cc] to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default CategorySidebar;
