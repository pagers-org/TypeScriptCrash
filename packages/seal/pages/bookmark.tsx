import Layout from 'components/Layout';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicBookmark = dynamic(() => import('components/Bookmark') as any);

const Saved = () => {
	return (
		<Layout title="Document">
			<DynamicBookmark />
		</Layout>
	);
};

export default Saved;
