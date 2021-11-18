import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { layout, space, color } from 'styled-system'

const Container = styled(View)`
  flex: 1;
  width: 100%;
  ${layout}
  ${space}
  ${color}
`
export default Container
