import React from 'react'
import { Text, } from 'react-native'
import styled from 'styled-components/native'
import { color } from 'styled-system'
import { theme } from '../styles/theme'

export default function Banner({ content, variant, ...restProps }) {
  if (!content) {
    return null;
  }
  return (
    <BannerContainer {...restProps} variant={variant}>
      <Text style={{
        color: (() => {
          switch (variant) {
            case "success":
              return theme.colors.green[700];
            case "error":
              return theme.colors.red[700];
            default:
              return theme.colors.red[700];
          }
        })(),
        fontSize: theme.getNumber(theme.fontSizes.md)
      }}>
        {content}
      </Text>
    </BannerContainer>
  )
}

const BannerContainer = styled.View`
  width: 100%;
  height: ${theme.space[10]}; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.space[2]};
  color: ${(props) => {
    switch (props.variant) {
      case "success":
        return theme.colors.green[100];
      case "error":
        return theme.colors.red[100];
      default:
        return theme.colors.red[100];
    }
  }};
  background-color: ${(props) => {
    switch (props.variant) {
      case "success":
        return theme.colors.green[100];
      case "error":
        return theme.colors.red[100];
      default:
        return theme.colors.red[100];
    }
  }}
  ${color}
`
