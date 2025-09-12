import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import AdminScreen from './screens/AdminScreen';


import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';


const Stack = createStackNavigator();


export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator headerMode='none' initialRouteName="Products">
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Admin" component={AdminScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </CartProvider>
    </ProductsProvider>
  );
}