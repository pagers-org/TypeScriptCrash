import { Link } from 'react-router-dom'
import Button from "../Button/Button";
import { Spacer, StyledHeader, Wrapper } from "./Header.styles";

interface Props {
  user: object;
  onLogout: () => {}
}

const Header = ({ user, onLogout }: Props) => {
  return (
    <>
      <StyledHeader>
        <Wrapper>
          <Link to="/" className="logo">Reacters</Link>
          <div className="right">
            {user
              ? (
                <>
                  <UserInfo>{user.username}</UserInfo>
                  <Button onClick={onLogout}>로그아웃</Button>
                </>
              )
              : (
                <Button to="/login">로그인</Button>
              )}

          </div>
        </Wrapper>
      </StyledHeader>
      <Spacer />
    </>
  );
};

export default Header;