import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode, useLayoutEffect } from 'react';
import { getLocalStorage } from 'utils/localStorage';
import Header from './Header';
import { Wrapper } from './index.styles';

interface Props {
	children: ReactNode;
	title: string;
}

const Layout = ({ children, title }: Props) => {
	const router = useRouter();

	useLayoutEffect(() => {
		const token = getLocalStorage('user_token');
		if (!token) router.push('/login');
	}, []);

	return (
		<Wrapper>
			<Head>
				<title>{title}</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main>{children}</main>
		</Wrapper>
	);
};

export default Layout;
