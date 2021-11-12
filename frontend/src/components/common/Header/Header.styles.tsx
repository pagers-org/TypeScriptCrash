import styled from 'styled-components';
import Responsive from '../Responsive/Responsive';

export const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트 속성에 스타일 추가 후 새로운 컴포넌트 생성
 */
export const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * fixed된 헤더와 컨텐츠 사이를 조절하는 컴포넌트
 */
export const Spacer = styled.div`
  height: 4rem;
`;

export const UserInfo = styled.div`
  font-weight: 800;
  margin-right:1rem;
`;