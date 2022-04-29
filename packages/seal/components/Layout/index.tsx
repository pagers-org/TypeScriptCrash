import Head from 'next/head';
import React, { ReactNode } from 'react';
import Header from './Header';
import { Wrapper } from './index.styles';

interface Props {
	children: ReactNode;
	title: string;
}

const Layout = ({ children, title }: Props) => {
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
