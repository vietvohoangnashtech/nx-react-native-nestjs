import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from './store/authStore';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import { verifyInstallation } from 'nativewind';

const Stack = createNativeStackNavigator();

export const App = () => {
  verifyInstallation();
  const { isLoggedIn, loading, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
