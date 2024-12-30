import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../utils/axios';
import { Button, Text } from 'react-native-paper';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoggedIn } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (isLoggedIn) {
      const fetchProducts = async () => {
        try {
          const response = await axiosInstance.get('/products');
          setProducts(response.data);
        } catch (err: any) {
          if (err.response?.data?.message) {
            setError(err.response.data.message);
          } else {
            setError('Fetch product failed');
          }
        }
      };
      fetchProducts();
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {isLoggedIn ? (
        <>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Profile')}
          >
            Go to Profile
          </Button>
          {products && products.length > 0 ? (
            <FlatList
              data={products}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text style={styles.productPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text>No products.</Text>
          )}
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    color: 'green',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default HomeScreen;
