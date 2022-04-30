import styled from '@emotion/styled';

export const Wrapper = styled.section`
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(0, 212, 255, 1) 0%,
		rgba(49, 101, 177, 1) 100%
	);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Form = styled.form`
	position: relative;
	z-index: 1;
	background: ${({ theme }) => theme.colors.WHITE};
	width: 270px;
	margin: 0 auto 100px;
	padding: 45px;
	text-align: center;
	box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%), 0 5px 5px 0 rgb(0 0 0 / 24%);
	border-radius: 30px;
`;

export const InputWrapper = styled.div`
	margin-bottom: 25px;
`;

export const Input = styled.input`
	outline: 0;
	background: ${({ theme }) => theme.colors.LIGHT_GRAY};
	width: 100%;
	border: 0;
	padding: 15px;
	box-sizing: border-box;
	font-size: 14px;
	border-radius: 30px;
`;

export const ErrorMessage = styled.p`
	margin: 3px 0px 0px 13px;
	position: absolute;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.RED};
`;

export const Button = styled.button`
	text-transform: uppercase;
	outline: 0;
	background: ${({ theme }) => theme.colors.DARK_BLUE};
	width: 100%;
	border: 0;
	padding: 15px;
	color: ${({ theme }) => theme.colors.WHITE};
	font-size: 14px;
	cursor: pointer;
	margin-top: 10px;
	border-radius: 30px;

	&: hover {
		background: ${({ theme }) => theme.colors.LIGHT_BLUE};
	}

	transition: background 0.3s ease-in-out;
`;

export const P = styled.p`
	margin: 15px 0 0;
	color: #b3b3b3;
	font-size: 12px;

	& > a {
		color: ${({ theme }) => theme.colors.DARK_BLUE};
    font-weight: bold;
    text-decoration: none;

		&: hover {
			color: ${({ theme }) => theme.colors.LIGHT_BLUE};
		}

		transition: color 0.3s ease-in-out;
	}
}
`;
