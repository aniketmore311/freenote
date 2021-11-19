import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={(optionProps) => ({
          headerTitle: (props) => {
            return <Header {...props}{...optionProps} />
          }
        })}
        name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
