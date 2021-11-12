import styled from 'styled-components';
import palette from '../../../lib/styles/palette';

export const StyledTags = styled.div`
  margin-top: 0.5rem;
  .tag{
    display: inline-block;
    color:${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover{
      color: ${palette.cyan[6]};
    }
  }
`;