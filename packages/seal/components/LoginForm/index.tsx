import { login } from 'api';
import { EMAIL_REGEX, ERROR_MESSAGE, SUCCESS_MESSAGE } from 'constants/index';
import Link from 'next/link';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
	Button,
	ErrorMessage,
	Form,
	Input,
	InputWrapper,
	P,
	Wrapper,
} from 'components/Form/index.styles';
import { setLocalStorage } from 'utils/localStorage';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UserBasicForm } from 'types';

interface Inputs extends UserBasicForm {}

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<Inputs>();

	const router = useRouter();

	const { mutate } = useMutation(login, {
		onSuccess: (data) => {
			const { _id, email } = data.data[0];
			setLocalStorage('user_token', _id);
			alert(SUCCESS_MESSAGE.LOGIN(email));
			router.push('/');
		},
	});

	const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
		mutate({
			email,
			password,
		});
	};

	return (
		<Wrapper>
			<Head>
				<title>Login</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputWrapper>
					<Input
						type="text"
						placeholder="이메일"
						{...register('email', {
							pattern: {
								value: EMAIL_REGEX,
								message: ERROR_MESSAGE.INVALID_EMAIL,
							},
							required: ERROR_MESSAGE.REQUIRED,
						})}
					/>
					<ErrorMessage>{errors.email?.message}</ErrorMessage>
				</InputWrapper>
				<InputWrapper>
					<Input
						type="password"
						placeholder="비밀번호"
						{...register('password', {
							required: ERROR_MESSAGE.REQUIRED,
						})}
					/>
					<ErrorMessage>{errors.password?.message}</ErrorMessage>
				</InputWrapper>
				<Button type="submit">로그인</Button>
				<P>
					계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
				</P>
			</Form>
		</Wrapper>
	);
};

export default LoginForm;
