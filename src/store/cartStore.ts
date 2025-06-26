import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  sellerId: number;
}

interface CartStore {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  addItem: (product: { id: number; name: string; price: number; imageUrl?: string; sellerId: number }) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalAmount: 0,
      totalItems: 0,

      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === product.id);

        if (existingItem) {
          set((state) => {
            const updatedItems = state.items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              items: updatedItems,
              totalAmount: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            };
          });
        } else {
          set((state) => {
            const newItem: CartItem = {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              imageUrl: product.imageUrl,
              sellerId: product.sellerId,
            };
            const updatedItems = [...state.items, newItem];
            return {
              items: updatedItems,
              totalAmount: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            };
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === productId);

        if (existingItem && existingItem.quantity > 1) {
          set((state) => {
            const updatedItems = state.items.map(item =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            return {
              items: updatedItems,
              totalAmount: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            };
          });
        } else {
          set((state) => {
            const updatedItems = state.items.filter(item => item.productId !== productId);
            return {
              items: updatedItems,
              totalAmount: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            };
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          );
          return {
            items: updatedItems,
            totalAmount: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalAmount: 0,
          totalItems: 0,
        });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find(item => item.productId === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
); 