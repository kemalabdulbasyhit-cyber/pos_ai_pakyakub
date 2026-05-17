import { CartItem, CartSummary } from '../types';

export const calculateCartSummary = (
  items: CartItem[],
  discountPercentage: number = 0,
  taxPercentage: number = 8.5
): CartSummary => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = subtotal * (discountPercentage / 100);
  const subtotalAfterDiscount = subtotal - discount;
  const tax = subtotalAfterDiscount * (taxPercentage / 100);
  const total = subtotalAfterDiscount + tax;

  return {
    subtotal,
    discount,
    tax,
    total,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getRarityColor = (rarity: string): string => {
  const colors = {
    common: 'rarity-common',
    premium: 'rarity-premium',
    'treasure-hunt': 'rarity-treasure-hunt',
    'super-treasure-hunt': 'rarity-super-treasure-hunt',
  };
  return colors[rarity as keyof typeof colors] || 'rarity-common';
};

export const getRarityLabel = (rarity: string): string => {
  const labels = {
    common: 'Common',
    premium: 'Premium',
    'treasure-hunt': 'Treasure Hunt',
    'super-treasure-hunt': 'Super TH',
  };
  return labels[rarity as keyof typeof labels] || rarity;
};

// Web Audio API sound generation
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

export const playSound = (type: 'add' | 'remove' | 'success') => {
  if (!audioContext) return;

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different actions
    switch (type) {
      case 'add':
        // Quick beep up
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;

      case 'remove':
        // Quick beep down
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;

      case 'success':
        // Victory chord
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
    }
  } catch (error) {
    console.log('Sound playback error:', error);
  }
};
