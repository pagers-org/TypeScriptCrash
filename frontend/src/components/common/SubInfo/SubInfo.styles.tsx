import { CSSProperties } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

export const StyledSubInfo = styled.div<CSSProperties>`
    margin-top: 1rem;
  color: ${palette.gray[6]};

  /* span 사이에 있는 가운데 문자 */
  span + span:before{
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운데 점 */
  }
`;