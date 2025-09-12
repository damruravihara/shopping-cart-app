import React, { createContext, useState, useEffect } from 'react';
import { getJSON, setJSON } from '../utils/storage';


const CART_KEY = 'CART_V1';
export const CartContext = createContext();
const TAX_RATE = 0.1;


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


    useEffect(() => {
        (async () => {
            const saved = await getJSON(CART_KEY, []);
            setCart(saved || []);
        })();
    }, []);


    const persist = async (newCart) => {
        setCart(newCart);
        await setJSON(CART_KEY, newCart);
    };


    const addToCart = async (product, qty = 1) => {
        const idx = cart.findIndex((i) => i.product.id === product.id);
        let newCart;
        if (idx === -1) {
            newCart = [{ product, quantity: qty }, ...cart];
        } else {
            newCart = cart.map((it, i) => (i === idx ? { ...it, quantity: it.quantity + qty } : it));
        }
        await persist(newCart);
    };


    const removeFromCart = async (productId) => {
        const newCart = cart.filter((i) => i.product.id !== productId);
        await persist(newCart);
    };


    const updateQuantity = async (productId, qty) => {
        if (qty <= 0) return removeFromCart(productId);
        const newCart = cart.map((it) => (it.product.id === productId ? { ...it, quantity: qty } : it));
        await persist(newCart);
    };


    const clearCart = async () => {
        await persist([]);
    };


    const totals = () => {
        const unit = cart.reduce((s, it) => s + it.product.price * it.quantity, 0);
        const shipping = cart.reduce((s, it) => s + (it.product.shipping || 0) * it.quantity, 0);
        const tax = (unit + shipping) * TAX_RATE;
        const total = unit + shipping + tax;
        return {
            unit,
            shipping,
            tax,
            total,
        };
    };


    const itemCount = cart.reduce((s, it) => s + it.quantity, 0);


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totals, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};