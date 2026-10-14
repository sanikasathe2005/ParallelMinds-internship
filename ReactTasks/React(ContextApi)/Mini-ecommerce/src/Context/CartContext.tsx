import { createContext,useCallback } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

interface IProduct {
  id: number;
  title: string;
  price: number;
}

interface ICartContext {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
}

export const CartContext = createContext<ICartContext | null>(null);

interface IProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: IProps) {
  const [cartItems, setCartItems] = useLocalStorage<IProduct[]>("cart", []);

const addToCart = useCallback((product: IProduct) => {
  setCartItems([...cartItems, product]);
}, [cartItems, setCartItems]);

const removeFromCart=useCallback((id: number)=> {
    setCartItems(cartItems.filter((product) => product.id !== id));
}, [cartItems, setCartItems]);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}