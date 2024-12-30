import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import clsx from 'clsx';

interface Props {
  onSubmit: (data: any) => void;
  isRegister?: boolean;
  loading: boolean;
  error?: string | null;
}

const LoginForm: React.FC<Props> = ({
  onSubmit,
  isRegister,
  loading,
  error,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  const btnText = isRegister ? 'Register' : 'Login';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit}
      >
        {btnText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginForm;
