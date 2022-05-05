import { theme } from 'styles/theme';

export interface CustomColorsTheme {
	colors: typeof theme.colors;
}

declare module '@emotion/react' {
	export interface Theme extends CustomColorsTheme, Theme {}
}
