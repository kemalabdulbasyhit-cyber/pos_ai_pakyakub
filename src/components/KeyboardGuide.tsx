import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardGuide: React.FC<KeyboardGuideProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: '1-5', action: 'Switch between categories' },
    { key: 'Ctrl+F', action: 'Focus search bar' },
    { key: 'Esc', action: 'Close modals / Clear search' },
    { key: 'Enter', action: 'Confirm payment' },
    { key: '/', action: 'Quick search' },
  ];

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-[#1a1a1a] rounded-2xl border-2 border-[#0066cc] neon-blue p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Keyboard className="text-[#0066cc]" size={24} />
                  <h2 className="racing-font text-2xl text-[#0066cc]">
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#999] hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg chrome-border"
                  >
                    <span className="text-[#999]">{shortcut.action}</span>
                    <kbd className="px-3 py-1 bg-[#1a1a1a] text-[#ffcc00] rounded border border-[#3a3a3a] font-mono text-sm">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-4 border-t border-[#3a3a3a] text-center text-sm text-[#666]"
              >
                Press <kbd className="px-2 py-1 bg-[#2a2a2a] rounded text-[#999]">?</kbd> to toggle this guide
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardGuide;
