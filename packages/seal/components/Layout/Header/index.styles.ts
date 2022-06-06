import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Menu } from 'types';

const explore = keyframes`
  0%,
  100% {
    transform-origin: center;
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
`;

const saved = keyframes`
  0%,
  100% {
    transform-style: preserve-3d;
    transform-origin: top;
    transform: skewX(0deg);
  }

  30% {
    transform: skewX(-6deg);
  }

  70% {
    transform: skewX(2deg);
  }
`;

export const Wrapper = styled.header`
	width: 540px;
	height: 110px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 0px 0px 40px 40px;
	box-shadow: 0 0 40px #0001;
`;

export const Ul = styled.ul`
	list-style: none;
	padding: 0 20px;
	width: 500px;
	height: 100px;
	border-radius: $40px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: relative;
`;

export const Label = styled.label<{
	isChecked: boolean;
	selectedMenu: Menu;
}>`
	width: 42px;
	height: auto;
	aspect-ratio: 1/1;
	color: ${({ isChecked, theme }) =>
		isChecked ? theme.colors.HIGHLIGHT : theme.colors.TEXT_COLOR};
	cursor: pointer;
	display: grid;
	place-items: center;
	position: relative;
	transition: transform 0.3s ease-in-out, color 0.1s linear;
	${({ isChecked }) =>
		isChecked &&
		css`
			transform: translateY(-10px);
		`}

	&: after {
		content: attr(data-label);
		position: absolute;
		bottom: -20px;
		text-transform: capitalize;
		font-weight: 800;
		pointer-events: none;
		opacity: 0;
		transform: translateY(50px);

		${({ isChecked }) =>
			isChecked &&
			`
		  opacity: 1;
		  transform: translateY(0px);
		`}
		transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out 0.1s;
	}

	& > svg {
		width: 37px;
		height: auto;
		aspect-ratio: 1/1;

		${({ isChecked, selectedMenu }) => {
			if (!isChecked) return '';

			switch (selectedMenu) {
				case 'explore': {
					return css`
						& > path {
							animation: ${explore} 0.3s linear;
						}
					`;
				}
				case 'saved': {
					return css`
						& > path {
							animation: ${saved} 0.3s linear;
						}
					`;
				}
				default:
					return '';
			}
		}}
	}
`;

export const Input = styled.input`
	display: none;
	pointer-events: none;
`;
