import styled from 'styled-components/native'
import { color, layout, space, typography } from 'styled-system'

const Typography = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({theme})=> theme.colors.gray[900]};
  ${color}
  ${layout}
  ${space}
  ${typography}
`

export default Typography;