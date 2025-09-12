import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, FAB, Badge } from 'react-native-paper';
import { ProductsContext } from '../contexts/ProductsContext';
import { CartContext } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';


const ProductsScreen = ({ navigation }) => {
    const { products } = useContext(ProductsContext);
    const { addToCart, itemCount } = useContext(CartContext);


    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Products" />
                <Appbar.Action icon="cart" onPress={() => navigation.navigate('Cart')} />
                <Appbar.Action icon="cog" onPress={() => navigation.navigate('Admin')} />
                <View style={{ marginRight: 12 }}>
                    {itemCount > 0 && <Badge visible>{itemCount}</Badge>}
                </View>
            </Appbar.Header>


            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAdd={(p) => addToCart(p)} isAdmin={false} />
                )}
            />


            <FAB style={{ position: 'absolute', right: 16, bottom: 16 }} icon="cart" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};


export default ProductsScreen;