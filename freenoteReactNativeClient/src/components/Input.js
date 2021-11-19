import styled from 'styled-components/native'
import { layout, color, space } from 'styled-system'
import { theme } from '../styles/theme'

const Input = styled.TextInput`
  width: 70%;
  height: ${theme.space[11]};
  border-width: 1px;
  border-color: ${(props)=> props.theme.colors.gray[600]};
  border-radius: ${theme.radii.lg};
  padding-left: ${theme.space[4]};
  padding-right: ${theme.space[4]};
  padding-top: ${theme.space[2]};
  padding-bottom: ${theme.space[2]};
  ${layout}
  ${color}
  ${space}
`
export default Input;