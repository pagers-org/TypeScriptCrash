import Feed from 'components/Explore/Feed';
import { RANDOM_FOX_URL } from 'constants/index';
import useBookmarks from 'hooks/query/useBookmarks';
import { getLocalStorage } from 'utils/localStorage';

const Bookmark = () => {
	const { data } = useBookmarks({
		_id: getLocalStorage('user_token'),
	});

	return data?.data.map((el) => (
		<Feed key={el._id} imageUrl={`${RANDOM_FOX_URL}/${el.url}.jpg`} isChecked />
	));
};

export default Bookmark;
