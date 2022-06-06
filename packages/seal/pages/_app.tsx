import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from 'styles/theme';
import { globalStyles } from 'styles/global';
import normalize from 'emotion-normalize';
import 'styles/font.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
				<Global styles={[normalize, globalStyles]} />
				<ReactQueryDevtools initialIsOpen={false} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
