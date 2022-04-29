import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from 'styles/theme';
import { globalStyles } from 'styles/global';
import normalize from 'emotion-normalize';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
			<Global styles={[normalize, globalStyles]} />
		</ThemeProvider>
	);
}

export default MyApp;
