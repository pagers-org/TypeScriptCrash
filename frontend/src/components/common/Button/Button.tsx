import { StyledButton, StyledLink } from './Button.styles'

export interface Props {
  to: string;
  cyan: string;
  fullWidth: string;
}

const Button = ({ to, cyan, fullWidth }: Props) => {
  return to
    ? (
      <StyledLink cyan={cyan ? 1 : 0} />
    )
    : (
      <StyledButton />
    );
}

export default Button;