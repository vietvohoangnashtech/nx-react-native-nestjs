import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../utils/axios';

const LoginScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(
        `/auth/${isRegister ? 'register' : 'login'}`,
        data
      );
      const { access_token } = response.data;
      login(access_token);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login Failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Register' : 'Login'}</Text>
      <LoginForm
        onSubmit={handleSubmit}
        isRegister={isRegister}
        loading={loading}
        error={error}
      />
      <View style={styles.switchBtnContainer}>
        <Text>
          {isRegister ? 'Already have an Account?' : 'Need an account?'}
        </Text>
        <Text
          onPress={() => setIsRegister(!isRegister)}
          style={styles.switchBtn}
        >
          {isRegister ? 'Login' : 'Register'}
        </Text>
      </View>
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
  switchBtnContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchBtn: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default LoginScreen;
