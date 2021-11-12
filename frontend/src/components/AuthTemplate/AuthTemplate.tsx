import { Link } from 'react-router-dom'
import { StyledAuthTemplate, WhiteBox } from './AuthTemplate.styles';

const AuthTemplate = ({ children }) => {
  return (
    <StyledAuthTemplate>
      <WhiteBox>
        <div className="logo-area">
          <Link to="/">Reacters</Link>
        </div>
        {children}
      </WhiteBox>
    </StyledAuthTemplate>
  );
};

export default AuthTemplate;