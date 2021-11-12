import { FC } from 'react';
import { StyledResponsive } from "./Responsive.styles";

interface Props {
  children: JSX.Element[] | JSX.Element
}

// style, className, onClick, onMouseMove 등의 props를 사용할 수 있게 rest 파라미터로 전달
const Responsive = ({ children, ...rest }: Props) => {
  return <StyledResponsive {...rest}>{children}</StyledResponsive>;
};

export default Responsive;