import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { mockMeals, getMockCart, saveMockCart, calculateCartTotals } from '../utils/mockData';

const CartContext = createContext();

// MOCK MODE - Set to true to work without backend
const MOCK_MODE = true;

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Load cart for both authenticated users and guests (MOCK_MODE supports guests via localStorage)
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      if (MOCK_MODE) {
        // Mock mode: get cart from localStorage
        const mockCart = getMockCart();
        // Populate meal data
        const populatedItems = mockCart.items.map(item => {
          const meal = mockMeals.find(m => m._id === item.meal);
          return {
            meal: meal,
            quantity: item.quantity
          };
        });
        const totals = calculateCartTotals(mockCart.items);
        setCart({
          items: populatedItems,
          totalPrice: totals.totalPrice,
          totalCalories: totals.totalCalories
        });
      } else {
        const { data } = await api.get('/cart');
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (mealId, quantity = 1) => {
    try {
      if (MOCK_MODE) {
        // Mock mode: update localStorage
        const mockCart = getMockCart();
        const existingItemIndex = mockCart.items.findIndex(item => item.meal === mealId);
        
        if (existingItemIndex > -1) {
          mockCart.items[existingItemIndex].quantity += quantity;
        } else {
          mockCart.items.push({ meal: mealId, quantity });
        }
        
        const totals = calculateCartTotals(mockCart.items);
        mockCart.totalPrice = totals.totalPrice;
        mockCart.totalCalories = totals.totalCalories;
        
        saveMockCart(mockCart);
        
        // Update state with populated data
        const populatedItems = mockCart.items.map(item => {
          const meal = mockMeals.find(m => m._id === item.meal);
          return {
            meal: meal,
            quantity: item.quantity
          };
        });
        
        setCart({
          items: populatedItems,
          totalPrice: mockCart.totalPrice,
          totalCalories: mockCart.totalCalories
        });
        
        toast.success('Đã thêm vào giỏ hàng!');
      } else {
        if (!isAuthenticated) {
          toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng!');
          return;
        }
        const { data } = await api.post('/cart/add', { mealId, quantity });
        setCart(data.data);
        toast.success('Đã thêm vào giỏ hàng!');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Không thể thêm vào giỏ hàng';
      toast.error(message);
      throw error;
    }
  };

  const updateCartItem = async (mealId, quantity) => {
    try {
      if (MOCK_MODE) {
        const mockCart = getMockCart();
        const itemIndex = mockCart.items.findIndex(item => item.meal === mealId);
        
        if (itemIndex > -1) {
          if (quantity <= 0) {
            mockCart.items.splice(itemIndex, 1);
          } else {
            mockCart.items[itemIndex].quantity = quantity;
          }
        }
        
        const totals = calculateCartTotals(mockCart.items);
        mockCart.totalPrice = totals.totalPrice;
        mockCart.totalCalories = totals.totalCalories;
        
        saveMockCart(mockCart);
        
        const populatedItems = mockCart.items.map(item => {
          const meal = mockMeals.find(m => m._id === item.meal);
          return {
            meal: meal,
            quantity: item.quantity
          };
        });
        
        setCart({
          items: populatedItems,
          totalPrice: mockCart.totalPrice,
          totalCalories: mockCart.totalCalories
        });
      } else {
        const { data } = await api.put('/cart/update', { mealId, quantity });
        setCart(data.data);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
      throw error;
    }
  };

  const removeFromCart = async (mealId) => {
    try {
      if (MOCK_MODE) {
        const mockCart = getMockCart();
        mockCart.items = mockCart.items.filter(item => item.meal !== mealId);
        
        const totals = calculateCartTotals(mockCart.items);
        mockCart.totalPrice = totals.totalPrice;
        mockCart.totalCalories = totals.totalCalories;
        
        saveMockCart(mockCart);
        
        const populatedItems = mockCart.items.map(item => {
          const meal = mockMeals.find(m => m._id === item.meal);
          return {
            meal: meal,
            quantity: item.quantity
          };
        });
        
        setCart({
          items: populatedItems,
          totalPrice: mockCart.totalPrice,
          totalCalories: mockCart.totalCalories
        });
        
        toast.success('Item removed from cart');
      } else {
        const { data } = await api.delete(`/cart/remove/${mealId}`);
        setCart(data.data);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item';
      toast.error(message);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (MOCK_MODE) {
        saveMockCart({ items: [], totalPrice: 0, totalCalories: 0 });
        setCart({ items: [], totalPrice: 0, totalCalories: 0 });
      } else {
        const { data } = await api.delete('/cart/clear');
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartItemCount = cart?.items?.length || 0;

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    cartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
