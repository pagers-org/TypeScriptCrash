import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const icon = keyframes`
  0% {
    margin-top: -0.5em;
    font-size: 1.5em;
  }

  100% {
    font-size: 1em;
    opacity: 1;
  }
`;

const checkIn = keyframes`
  0% {
    left: 60%;
    top: 60%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
  }

  80% {
    left: 45%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
  }

  100% {
    top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
  }
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1em;
	border: 2px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
	border-radius: 15px;
	padding: 20px;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

export const IconWrapper = styled.div`
	font-size: 20px;
	width: 1.9em;
	height: 1.9em;
	margin: 10px;
	display: inline-block;
	position: relative;
	vertical-align: middle;
`;

export const Input = styled.input`
	display: none;
`;

export const Label = styled.label<{ checked: boolean }>`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border: 0.1em solid ${({ theme }) => theme.colors.GRAY};
	border-radius: 100%;
	display: block;
	color: ${({ theme }) => theme.colors.GRAY};
	font-size: inherit;
	text-rendering: auto;

	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0px 0px 0px 0px rgba(226, 32, 44, 0.5);

	& > svg {
		position: absolute;
	}

	${({ checked, theme }) =>
		checked &&
		css`
			background-color: ${theme.colors.RED};
			border-color: ${theme.colors.RED};
			box-shadow: 0px 0px 0px 0.5em rgba(226, 32, 44, 0);

			& > svg {
				animation: ${checkIn} 0.3s forwards;
				color: ${theme.colors.WHITE};
				transition: color 0.3s ease-in-out;
			}
			transition: background-color 0.1s 0.2s, box-shadow 1s;
			border-width: 0.1em;
			border-style: solid;
		`}

	&: after {
		left: 0;
		top: 50%;
		margin-top: -0.5em;
		display: block;
		position: relative;
		text-align: center;

		${({ checked }) =>
			checked &&
			css`
				& > svg {
					animation: ${icon} 0.3s forwards;
				}
			`}
	}
`;
