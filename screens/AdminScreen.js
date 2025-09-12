import React, { useContext, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, Button, Dialog, Portal, TextInput, Card, IconButton } from 'react-native-paper';
import { ProductsContext } from '../contexts/ProductsContext';


const AdminScreen = ({ navigation }) => {
    const { products, addProduct, editProduct, deleteProduct } = useContext(ProductsContext);
    const [visible, setVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', description: '', price: '', shipping: '' });


    const openForNew = () => {
        setEditing(null);
        setForm({ name: '', description: '', price: '', shipping: '' });
        setVisible(true);
    };


    const openForEdit = (p) => {
        setEditing(p);
        setForm({ name: p.name, description: p.description || '', price: String(p.price), shipping: String(p.shipping || 0) });
        setVisible(true);
    };


    const onSave = async () => {
        if (!form.name || !form.price) {
            alert('Name and price required');
            return;
        }
        const payload = { name: form.name, description: form.description, price: parseFloat(form.price), shipping: parseFloat(form.shipping || 0) };
        if (editing) {
            await editProduct(editing.id, payload);
        } else {
            await addProduct(payload);
        }
        setVisible(false);
    };


    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Admin - Products" />
            </Appbar.Header>


            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ margin: 8 }}>
                        <Card.Title title={item.name} subtitle={`Rs.${item.price.toFixed(2)} - Shipping: Rs.${item.shipping.toFixed(2)}`} />
                        <Card.Actions>
                            <Button onPress={() => openForEdit(item)}>Edit</Button>
                            <Button onPress={() => deleteProduct(item.id)}>Delete</Button>
                        </Card.Actions>
                    </Card>
                )}
            />


            <Button mode="contained" onPress={openForNew} style={{ margin: 16 }}>Add product</Button>


            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <Dialog.Title>{editing ? 'Edit product' : 'Add product'}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput label="Name" value={form.name} onChangeText={(t) => setForm({ ...form, name: t })} />
                        <TextInput label="Description" value={form.description} onChangeText={(t) => setForm({ ...form, description: t })} />
                        <TextInput label="Price" keyboardType="numeric" value={form.price} onChangeText={(t) => setForm({ ...form, price: t })} />
                        <TextInput label="Shipping" keyboardType="numeric" value={form.shipping} onChangeText={(t) => setForm({ ...form, shipping: t })} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                        <Button onPress={onSave}>Save</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};


export default AdminScreen;