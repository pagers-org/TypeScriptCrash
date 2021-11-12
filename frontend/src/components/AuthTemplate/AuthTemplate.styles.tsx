import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button/Button';

// 회원가입/로그인 페이지 레이아웃 컴포넌트
export const StyledAuthTemplate = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

// 회원가입/로그인 폼
export const StyeldAuthForm = styled.div`
  h3{
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }

  &+&{
    margin-top: 1rem;
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a{
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover{
      color: ${palette.gray[9]};
    }
  }
`;

export const StyledButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

export const textMap = {
  login   : '로그인',
  register: '회원가입',
};

export const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0%.875rem;
  margin-top: 1rem;
`;