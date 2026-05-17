import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingCart, Zap } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency, calculateCartSummary } from '../utils/helpers';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  discount: number;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  discount,
}) => {
  const summary = calculateCartSummary(items, discount);

  return (
    <div className="h-full flex flex-col carbon-fiber border-l-2 border-[#0066cc]/30">
      {/* Header */}
      <div className="p-6 border-b-2 border-[#0066cc]/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="racing-font text-2xl text-[#0066cc]">
            Pit Stop
          </h2>
          <div className="flex items-center gap-2 bg-[#0066cc]/20 px-3 py-1 rounded-full">
            <ShoppingCart size={16} className="text-[#0066cc]" />
            <span className="font-bold text-[#0066cc]">{items.length}</span>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-[#0066cc] via-[#ffcc00] to-transparent rounded-full"></div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center py-12"
            >
              <div className="text-6xl mb-4 opacity-50">🏎️</div>
              <p className="text-[#666] text-sm">
                Your cart is empty
              </p>
              <p className="text-[#666] text-xs mt-1">
                Start your engines!
              </p>
            </motion.div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="bg-[#2a2a2a] rounded-lg p-3 chrome-border"
              >
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="w-16 h-16 flex items-center justify-center bg-[#1a1a1a] rounded-lg text-3xl">
                    {item.product.image}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#999] font-mono">
                      {item.product.toyNumber}
                    </p>
                    <p className="text-[#ff5a00] font-bold text-sm mt-1">
                      {formatCurrency(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-1">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 flex items-center justify-center bg-[#ff5a00] text-white rounded hover:bg-[#ff7a30] transition-all btn-press"
                    >
                      <Minus size={14} />
                    </motion.button>
                    
                    <span className="w-8 text-center font-bold text-white">
                      {item.quantity}
                    </span>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center bg-[#0066cc] text-white rounded hover:bg-[#0088ff] transition-all btn-press"
                    >
                      <Plus size={14} />
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-[#666]">Total</div>
                      <div className="font-bold text-[#ffcc00]">
                        {formatCurrency(item.product.price * item.quantity)}
                      </div>
                    </div>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="w-7 h-7 flex items-center justify-center bg-red-600/20 text-red-500 rounded hover:bg-red-600/40 transition-all btn-press"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Summary Section */}
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-t-2 border-[#0066cc]/30 bg-[#1a1a1a]/50"
        >
          {/* Subtotal */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#999] text-sm">Subtotal</span>
            <span className="text-white font-semibold">
              {formatCurrency(summary.subtotal)}
            </span>
          </div>

          {/* Fuel Boost (Discount) */}
          {summary.discount > 0 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#ffcc00] text-sm flex items-center gap-1">
                <Zap size={14} />
                Fuel Boost ({discount}%)
              </span>
              <span className="text-[#ffcc00] font-semibold">
                -{formatCurrency(summary.discount)}
              </span>
            </div>
          )}

          {/* Tax */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#999] text-sm">Tax (8.5%)</span>
            <span className="text-white font-semibold">
              {formatCurrency(summary.tax)}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-4 pt-3 border-t border-[#3a3a3a]">
            <span className="racing-font text-lg text-[#ff5a00]">
              Grand Total
            </span>
            <span className="racing-font text-2xl text-[#ff5a00] digit-display">
              {formatCurrency(summary.total)}
            </span>
          </div>

          {/* Checkered Flag Divider */}
          <div className="mb-4 h-3 bg-[repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a_10px,#fff_10px,#fff_20px)] opacity-20"></div>

          {/* Checkout Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCheckout}
            className="w-full py-4 rounded-xl font-bold text-white text-lg racing-font
              bg-gradient-to-r from-[#ffcc00] via-[#ff5a00] to-[#ffcc00]
              hover:from-[#ff5a00] hover:via-[#ffcc00] hover:to-[#ff5a00]
              neon-yellow transition-all-smooth shine-effect
              relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              🏁 FINISH LINE
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
