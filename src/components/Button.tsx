import { styled } from 'goober'

const Button = styled('button')`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--color-gray-1);
`
Button.defaultProps = { type: 'button' }

export default Button
