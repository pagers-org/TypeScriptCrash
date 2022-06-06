import Explore from 'components/Explore';
import Layout from 'components/Layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<Layout title="Document">
			<Explore />
		</Layout>
	);
};

export default Home;
