import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, Card, Button, IconButton, Text, Divider } from 'react-native-paper';
import { CartContext } from '../contexts/CartContext';


const CartScreen = ({ navigation }) => {
    const { cart, updateQuantity, removeFromCart, clearCart, totals } = useContext(CartContext);
    const { unit, shipping, tax, total } = totals();


    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Your Cart" />
            </Appbar.Header>


            <FlatList
                data={cart}
                keyExtractor={(item) => item.product.id}
                renderItem={({ item }) => (
                    <Card style={{ margin: 8 }}>
                        <Card.Title title={item.product.name} subtitle={`Unit: Rs.${item.product.price.toFixed(2)}`} />
                        <Card.Content>
                            <Text>Shipping: Rs.{item.product.shipping ? item.product.shipping.toFixed(2) : '0.00'}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <IconButton icon="minus" onPress={() => updateQuantity(item.product.id, item.quantity - 1)} />
                            <IconButton icon="plus" onPress={() => updateQuantity(item.product.id, item.quantity + 1)} />
                            <Button onPress={() => removeFromCart(item.product.id)}>Remove</Button>
                        </Card.Actions>
                    </Card>
                )}
                ListEmptyComponent={<View style={{ padding: 16 }}><Text>Your cart is empty.</Text></View>}
            />


            <Divider />


            <View style={{ padding: 16 }}>
                <Text>Subtotal (units): Rs.{unit.toFixed(2)}</Text>
                <Text>Shipping: Rs.{shipping.toFixed(2)}</Text>
                <Text>Tax (10%): Rs.{tax.toFixed(2)}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 8 }}>Total: Rs.{total.toFixed(2)}</Text>


                <Button mode="contained" onPress={() => {cart.length > 0 ? (clearCart(), alert("order placed")) : alert('Your cart is empty.'); }} style={{ marginTop: 12 }}>
                    Checkout
                </Button>
            </View>
        </View>
    );
};


export default CartScreen;