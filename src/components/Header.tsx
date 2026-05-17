import { motion } from 'framer-motion';
import { Gauge, Zap, HelpCircle } from 'lucide-react';

interface HeaderProps {
  discount: number;
  onDiscountChange: (value: number) => void;
  onHelpClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ discount, onDiscountChange, onHelpClick }) => {
  return (
    <div className="carbon-fiber border-b-2 border-[#ff5a00]/30 p-6">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="text-6xl">🏎️</div>
          <div>
            <h1 className="racing-font text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffcc00] to-[#ff5a00]">
              Hot Wheels POS
            </h1>
            <p className="text-[#999] text-sm mt-1">
              Race to the Checkout!
            </p>
          </div>
        </motion.div>

        {/* Stats/Controls */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          {/* Help Button */}
          {onHelpClick && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHelpClick}
              className="w-10 h-10 flex items-center justify-center bg-[#2a2a2a] rounded-lg chrome-border hover:bg-[#3a3a3a] transition-all btn-press"
              title="Keyboard Shortcuts (?)"
            >
              <HelpCircle size={20} className="text-[#ffcc00]" />
            </motion.button>
          )}

          {/* Speed Gauge (Decorative) */}
          <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-lg chrome-border">
            <Gauge size={20} className="text-[#0066cc]" />
            <div>
              <div className="text-xs text-[#666]">System</div>
              <div className="text-sm font-bold text-[#0066cc]">ONLINE</div>
            </div>
          </div>

          {/* Fuel Boost (Discount) Control */}
          <div className="flex items-center gap-3 bg-[#2a2a2a] px-4 py-2 rounded-lg chrome-border">
            <Zap size={20} className="text-[#ffcc00]" />
            <div>
              <div className="text-xs text-[#666] mb-1">Fuel Boost</div>
              <div className="flex items-center gap-2">
                {[0, 5, 10, 15].map((value) => (
                  <button
                    key={value}
                    onClick={() => onDiscountChange(value)}
                    className={`
                      px-2 py-1 rounded text-xs font-bold transition-all btn-press
                      ${
                        discount === value
                          ? 'bg-[#ffcc00] text-[#1a1a1a]'
                          : 'bg-[#1a1a1a] text-[#666] hover:text-[#ffcc00]'
                      }
                    `}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Racing Stripe */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 h-1 bg-gradient-to-r from-[#ff5a00] via-[#ffcc00] via-[#0066cc] to-[#ff5a00] rounded-full"
      />
    </div>
  );
};

export default Header;
