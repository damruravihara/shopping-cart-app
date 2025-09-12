import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { getJSON, setJSON } from '../utils/storage';


const PRODUCTS_KEY = 'PRODUCTS_V1';


export const ProductsContext = createContext();


export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        (async () => {
            const saved = await getJSON(PRODUCTS_KEY, null);
            if (saved) {
                setProducts(saved);
            } else {
                const seed = [
                    { id: 'p1', name: 'T-Shirt', price: 15.0, shipping: 2.5, description: '100% cotton' },
                    { id: 'p2', name: 'Mug', price: 7.5, shipping: 1.5, description: 'Ceramic mug 300ml' },
                    { id: 'p3', name: 'Cap', price: 12.0, shipping: 2.0, description: 'Adjustable cap' },
                ];
                setProducts(seed);
                await setJSON(PRODUCTS_KEY, seed);
            }
        })();
    }, []);


    const persist = async (newProducts) => {
        setProducts(newProducts);
        await setJSON(PRODUCTS_KEY, newProducts);
    };


    const addProduct = async (product) => {
        const newProduct = { ...product, id: Date.now().toString() };
        await persist([newProduct, ...products]);
    };


    const editProduct = async (id, updates) => {
        const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
        await persist(updated);
    };


    const deleteProduct = async (id) => {
        const filtered = products.filter((p) => p.id !== id);
        await persist(filtered);
    };


    return (
        <ProductsContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
};