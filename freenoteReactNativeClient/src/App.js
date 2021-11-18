import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from './components/Button';
import Container from './components/Container';

function App() {
  const [count, setCount] = useState(0);
  return (
    <Container justifyContent="center" alignItems="center">
      <Button title="click me" onPress={(e) => { setCount(pre => pre + 1) }}>
        <Text style={{ color: 'white' }}>increment</Text>
      </Button>
      <Text style={{ marginTop: 20 }}>
        {
          count
        }
      </Text>
      <Button mt="20px" title="click me" onPress={(e) => { setCount(0) }} >
        <Text style={{ color: "white" }}>reset</Text>
      </Button>

    </Container>
  )
}
export default App;