import React, {  } from 'react'
import { Text } from 'react-native'
import { client } from '../client'
import Button from '../components/Button'
import Container from '../components/Container'
import { useUserStore } from '../stores/userStore'
import { theme } from '../styles/theme'

export default function HomeScreen() {
  const user = useUserStore(state => state.user);
  const userStore = useUserStore();

  return (
    <Container justifyContent="center" alignItems="center">
      <Text>hello {user?.firstname}</Text>
      <Button mt={theme.space[8]} py={theme.space[3]} width="100%">
        <Text onPress={async () => { userStore.setUser(null); await client.logout() }} style={{ color: "white", fontSize: theme.getNumber(theme.fontSizes.lg), textAlign: "center" }}>logout</Text>
      </Button>
    </Container>
  )

}
