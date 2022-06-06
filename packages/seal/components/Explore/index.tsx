import Loading from 'components/Loading';
import useFoxPictures from 'hooks/query/useFoxPictures';
import InfiniteScroll from 'react-infinite-scroller';
import Feed from './Feed';

const Explore = () => {
	const { data, isLoading, fetchNextPage, hasNextPage } = useFoxPictures();

	if (isLoading) return <Loading key="loading-1" />;

	return (
		<InfiniteScroll
			loadMore={() => fetchNextPage()}
			hasMore={hasNextPage}
			loader={<Loading key="loading-2" />}
			element="section"
		>
			{data?.pages.map(({ feeds }) =>
				feeds.map(({ id, imageUrl }) => <Feed key={id} imageUrl={imageUrl} />),
			)}
		</InfiniteScroll>
	);
};

export default Explore;
