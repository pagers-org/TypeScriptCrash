import { CSSProperties } from 'react';
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components';
import palette from '../../../lib/styles/palette';

const styleButton = css<CSSProperties>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${({ theme }) => theme.fullWidth && css`
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    width: 100%;
    font-size: 1.125rem;
  `}

  ${({ theme }) => theme.cyan && css`
    background: ${palette.cyan[5]};
    &:hover{
      background: ${palette.cyan[4]};
    }
  `}

  &:disabled{
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

export const StyledButton = styled.button`
  ${styleButton}
`;

export const StyledLink = styled(Link)`
  ${styleButton};
`;