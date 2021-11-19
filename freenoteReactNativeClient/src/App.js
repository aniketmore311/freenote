import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { client } from './client';
import Banner from './components/Banner';
import useLoading from './hooks/useLoading';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import HomeNavigator from './navigators/HomeNavigator';
import LoadingScreen from './screens/LoadingScreen';
import { useMessageStore } from './stores/messageStore';
import { useUserStore } from './stores/userStore';
import { theme } from './styles/theme';


function App() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const { errorMessage, successMessage } = useMessageStore();

  const { isLoading, startLoading, stopLoading } = useLoading(true);

  useEffect(() => {
    (async () => {
      // await client._debug();
      try {
        startLoading();
        const user = await client.getUser();
        // await client._debug();
        setUser(user);
        stopLoading();
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>

        <Banner content={successMessage} variant="success" />
        <Banner content={errorMessage} variant="error" />
        {
          isLoading ?
            <LoadingScreen />
            : (
              user
                ?
                <HomeNavigator />
                :
                <AuthStackNavigator />
            )
        }
      </NavigationContainer>
    </ThemeProvider >
  )
}
export default App;