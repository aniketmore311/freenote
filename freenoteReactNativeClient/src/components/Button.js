import React from 'react'
import styled from 'styled-components/native'
import { color, layout, space,flex } from 'styled-system'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { theme } from '../styles/theme'

export default function Button({ children, loading, loadingColor, ...restProps }) {
  return (
    <SytledOpacity {...restProps}  >
      {
        loading
          ? <ActivityIndicator color={loadingColor || "white"} />
          : children
      }
    </SytledOpacity>
  )
}


const SytledOpacity = styled(TouchableOpacity)`
  background-color: #3B82F6;
  border-radius: ${theme.radii.lg};
  padding-left: ${theme.space[4]};
  padding-right: ${theme.space[4]};
  padding-top: ${theme.space[2]};
  padding-bottom: ${theme.space[2]};
  ${color}
  ${space}
  ${layout}
  ${flex}
`

