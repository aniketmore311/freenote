import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Banner from '../components/Banner'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import { theme } from '../styles/theme'
const { getNumber } = theme;

export default function SignupScreen({ navigation, params }) {
  return (
    <>
      {
        params?.success ? (
          <Banner content={params?.success} variant="success" />
        ) : null
      }
      {
        params?.error ? (
          <Banner content={params.error} variant="error" />
        ) : null
      }
      <Container justifyContent="center" alignItems="flex-start" p="32px">
        <Text style={{ color: "black", fontWeight: "bold", marginBottom: getNumber(theme.space[8]), fontSize: getNumber(theme.fontSize['3xl']), textAlign: "center", width: "100%" }}>Signup</Text>
        <Input width="100%" placeholder="Firstname..." mb={theme.space[4]} placeholderTextColor={theme.colors.gray[500]} />
        <Input width="100%" placeholder="Lastname..." mb={theme.space[4]} placeholderTextColor={theme.colors.gray[500]} />
        <Input width="100%" placeholder="Email..." mb={theme.space[4]} placeholderTextColor={theme.colors.gray[500]} />
        <Input width="100%" placeholder="Password..." placeholderTextColor={theme.colors.gray[500]} />
        <Button mt={theme.space[8]} py={theme.space[3]} width="100%">
          <Text style={{ color: "white", fontSize: getNumber(theme.fontSize.lg), textAlign: "center" }}>signup</Text>
        </Button>
        <View style={{ marginTop: getNumber(theme.space[4]) }}>
          <Text style={{ color: "black", fontSize: getNumber(theme.fontSize.md), textAlign: "center" }}>
            Already an account?{' '}
            <Text style={{ color: theme.colors.blue[500], textDecorationLine: "underline", fontSize: getNumber(theme.fontSize.md), textAlign: "center" }} onPress={(e) => { navigation.navigate('Login') }}>
              login
            </Text>
          </Text>
        </View>
      </Container>
    </>
  )
}
