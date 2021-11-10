import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  height: 4rem;
  background-color: ${({ theme }) => theme.white};

  svg {
    padding: 0.5rem 0;
    height: 100%;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 1.625rem;
  font-weight: 800;
  margin-left: 0.125rem;
  transform: translateY(-0.125rem);
`