import { Link } from 'react-router-dom';
import { StyledSubInfo } from './SubInfo.styles';

export interface Props {
  username: string;
  publishedDate: string;
}

const SubInfo = ({ username, publishedDate }: Props) => {
  return (
    <StyledSubInfo>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </StyledSubInfo>
  );
};

export default SubInfo;
