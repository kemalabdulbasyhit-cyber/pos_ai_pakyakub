import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff5a00]">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name, series, or year..."
          className="w-full pl-12 pr-12 py-4 bg-[#2a2a2a] text-white rounded-xl
            border-2 border-[#3a3a3a] focus:border-[#ff5a00] focus:neon-orange
            outline-none transition-all-smooth placeholder-[#666]"
        />

        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#ff5a00] transition-colors"
          >
            <X size={20} />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;
