import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';


const ProductCard = ({ product, onAdd, onEdit, isAdmin }) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{product.name}</Title>
                <Paragraph>{product.description}</Paragraph>
                <Paragraph>Unit price: Rs.{product.price.toFixed(2)}</Paragraph>
                <Paragraph>Shipping: Rs.{product.shipping ? product.shipping.toFixed(2) : '0.00'}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" onPress={() => onAdd(product)}>
                    Add to cart
                </Button>
                {isAdmin && (
                    <Button onPress={() => onEdit(product)}>
                        Edit
                    </Button>
                )}
            </Card.Actions>
        </Card>
    );
};


const styles = StyleSheet.create({
    card: { margin: 8 },
});


export default ProductCard;