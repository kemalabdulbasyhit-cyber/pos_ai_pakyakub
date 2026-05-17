import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, DollarSign, X, CheckCircle } from 'lucide-react';
import { PaymentMethod } from '../types';
import { formatCurrency } from '../utils/helpers';

interface PaymentModalProps {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onConfirm: (method: PaymentMethod) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  total,
  onClose,
  onConfirm,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const paymentMethods = [
    {
      id: 'cash' as PaymentMethod,
      name: 'Cash',
      icon: DollarSign,
      color: '#22c55e',
      bgColor: 'from-green-600 to-green-700',
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Credit Card',
      icon: CreditCard,
      color: '#3b82f6',
      bgColor: 'from-blue-600 to-blue-700',
    },
    {
      id: 'digital-wallet' as PaymentMethod,
      name: 'Digital Wallet',
      icon: Wallet,
      color: '#f59e0b',
      bgColor: 'from-amber-600 to-amber-700',
    },
  ];

  const handleConfirm = () => {
    if (selectedMethod) {
      onConfirm(selectedMethod);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
              w-full max-w-md"
          >
            <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#ff5a00] neon-orange-intense p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="racing-font text-2xl text-[#ff5a00]">
                  Payment Dashboard
                </h2>
                <button
                  onClick={onClose}
                  className="text-[#999] hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Total Display */}
              <div className="mb-6 p-4 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] rounded-xl chrome-border">
                <div className="text-sm text-[#999] mb-1">Total Amount</div>
                <div className="racing-font text-3xl text-[#ffcc00] digit-display">
                  {formatCurrency(total)}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                <div className="text-sm text-[#999] mb-3">Select Payment Method</div>
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;

                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`
                        w-full p-4 rounded-xl transition-all-smooth
                        border-2 relative overflow-hidden
                        ${
                          isSelected
                            ? 'border-[#ff5a00] neon-orange'
                            : 'border-[#3a3a3a] hover:border-[#4a4a4a]'
                        }
                        bg-gradient-to-r ${method.bgColor}
                      `}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <div
                          className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center"
                          style={{ color: method.color }}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-white">{method.name}</div>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-[#ffcc00]"
                          >
                            <CheckCircle size={24} />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Confirm Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={!selectedMethod}
                className={`
                  w-full py-4 rounded-xl font-bold text-white text-lg racing-font
                  transition-all-smooth
                  ${
                    selectedMethod
                      ? 'bg-gradient-to-r from-[#ffcc00] via-[#ff5a00] to-[#ffcc00] neon-yellow cursor-pointer'
                      : 'bg-[#3a3a3a] text-[#666] cursor-not-allowed'
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  {selectedMethod ? '🏁 Complete Sale' : '⚠️ Select Payment Method'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
