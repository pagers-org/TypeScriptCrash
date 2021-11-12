import { Link } from 'react-router-dom';
import { StyledTags } from './Tag.styles';

export interface Props {
  tags: Array<string>
}

const Tags = ({ tags } : Props) => {
  return (
    <StyledTags>
      {tags.map(tag => (
        <Link
          className="tag"
          to={`/?tag=${tag}`}
          key={tag}>
          #{tag}
        </Link>
      ))}
    </StyledTags>
  );
};

export default Tags;
