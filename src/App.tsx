import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import PaymentModal from './components/PaymentModal';
import VictoryAnimation from './components/VictoryAnimation';
import AddToCartAnimation from './components/AddToCartAnimation';
import LoadingScreen from './components/LoadingScreen';
import KeyboardGuide from './components/KeyboardGuide';
import { Product, CartItem, PaymentMethod } from './types';
import { products, categories } from './data/products';
import { playSound } from './utils/helpers';
import './index.css';

interface AnimationData {
  id: string;
  productImage: string;
  fromPosition: { x: number; y: number };
  toPosition: { x: number; y: number };
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('mainline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const [animations, setAnimations] = useState<AnimationData[]>([]);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) => product.category === selectedCategory
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.toyNumber.toLowerCase().includes(query) ||
          product.series?.toLowerCase().includes(query) ||
          product.year?.toString().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Add to cart with animation
  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    // Get element position for animation
    if (event) {
      const rect = (event.target as HTMLElement)
        .closest('.group')
        ?.getBoundingClientRect();
      const cartElement = document.querySelector('.cart-container');
      const cartRect = cartElement?.getBoundingClientRect();

      if (rect && cartRect) {
        const animationId = `${product.id}-${Date.now()}`;
        setAnimations((prev) => [
          ...prev,
          {
            id: animationId,
            productImage: product.image,
            fromPosition: {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            },
            toPosition: {
              x: cartRect.left + cartRect.width / 2,
              y: cartRect.top + 100,
            },
          },
        ]);

        // Remove animation after completion
        setTimeout(() => {
          setAnimations((prev) => prev.filter((a) => a.id !== animationId));
        }, 700);
      }
    }

    // Play sound
    playSound('add');

    // Update cart
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    playSound('remove');
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsPaymentModalOpen(true);
    }
  };

  // Payment confirmation
  const handlePaymentConfirm = (method: PaymentMethod) => {
    console.log('Payment method:', method);
    playSound('success');
    setIsPaymentModalOpen(false);
    setShowVictory(true);
  };

  // Victory complete
  const handleVictoryComplete = () => {
    setShowVictory(false);
    setCartItems([]);
    setDiscount(0);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle keyboard guide with ?
      if (e.key === '?' && !isPaymentModalOpen && !showVictory) {
        setShowKeyboardGuide((prev) => !prev);
        return;
      }

      // Close modals with Escape
      if (e.key === 'Escape') {
        if (showKeyboardGuide) {
          setShowKeyboardGuide(false);
        } else if (isPaymentModalOpen) {
          setIsPaymentModalOpen(false);
        } else if (searchQuery) {
          setSearchQuery('');
        }
        return;
      }

      // Category switching with numbers 1-5
      if (e.key >= '1' && e.key <= '5') {
        const categoryIndex = parseInt(e.key) - 1;
        if (categoryIndex < categories.length) {
          setSelectedCategory(categories[categoryIndex].id);
        }
        return;
      }

      // Focus search with Ctrl+F or /
      if ((e.ctrlKey && e.key === 'f') || e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaymentModalOpen, showVictory, showKeyboardGuide, searchQuery]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="h-screen w-screen overflow-hidden bg-[#1a1a1a] text-white flex flex-col">
        {/* Header */}
        <Header 
          discount={discount} 
          onDiscountChange={setDiscount}
          onHelpClick={() => setShowKeyboardGuide(true)}
        />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Categories */}
        <div className="w-64 flex-shrink-0">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Center - Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="p-6 carbon-fiber border-b-2 border-[#ff5a00]/30">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Category Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-hidden"
            >
              <ProductGrid
                products={filteredProducts}
                onAddToCart={(product, event) => handleAddToCart(product, event)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Sidebar - Cart */}
        <div className="w-96 flex-shrink-0 cart-container">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            discount={discount}
          />
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        total={
          cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ) *
          (1 - discount / 100) *
          1.085
        }
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handlePaymentConfirm}
      />

      {/* Victory Animation */}
      <VictoryAnimation
        isVisible={showVictory}
        onComplete={handleVictoryComplete}
      />

      {/* Keyboard Guide */}
      <KeyboardGuide
        isOpen={showKeyboardGuide}
        onClose={() => setShowKeyboardGuide(false)}
      />

      {/* Add to Cart Animations */}
      {animations.map((animation) => (
        <AddToCartAnimation
          key={animation.id}
          productImage={animation.productImage}
          fromPosition={animation.fromPosition}
          toPosition={animation.toPosition}
          onComplete={() => {}}
        />
      ))}
      </div>
    </>
  );
}

export default App;
