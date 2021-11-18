import React from 'react'
import styled from 'styled-components/native'
import { color, space } from 'styled-system'
import { TouchableOpacity } from 'react-native'

const Button = styled(TouchableOpacity)`
  background-color: #3B82F6;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  ${color}
  ${space}
`

export default Button;

