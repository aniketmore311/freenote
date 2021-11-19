import React from 'react'
import {  ActivityIndicator } from 'react-native'
import Container from '../components/Container'

export default function LoadingScreen() {
  return (
    <Container justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Container>
  )
}
