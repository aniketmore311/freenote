import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Button from './components/Button';
import Container from './components/Container';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { theme } from './styles/theme';
import AuthStackNavigator from './navigators/AuthStackNavigator';


function App() {
  const [count, setCount] = useState(0);
  return (
    <NavigationContainer>
      {/* <LoginScreen /> */}
      {/* <SignupScreen /> */}
      <AuthStackNavigator />
    </NavigationContainer>
  )
}
export default App;