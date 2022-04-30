import React from 'react';
import {
	Button,
	ErrorMessage,
	Form,
	Input,
	InputWrapper,
	P,
	Wrapper,
} from 'components/Form/index.styles';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REGEX, ERROR_MESSAGE, SUCCESS_MESSAGE } from 'constants/index';
import { signup } from 'api';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UserBasicForm } from 'types';

interface Inputs extends UserBasicForm {
	passwordCheck: string;
}

const SignupForm = () => {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const watchedPassword = watch('password');
	const router = useRouter();

	const { mutate } = useMutation(signup, {
		onSuccess: () => {
			alert(SUCCESS_MESSAGE.SIGNUP);
			router.push('/login');
		},
	});

	const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
		mutate({ email, password });
	};

	return (
		<Wrapper>
			<Head>
				<title>Signup</title>
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
				<InputWrapper>
					<Input
						type="password"
						placeholder="비밀번호 확인"
						{...register('passwordCheck', {
							required: ERROR_MESSAGE.REQUIRED,
							validate: (value) =>
								value === watchedPassword || ERROR_MESSAGE.NOT_MATCH_PASSWORD,
						})}
					/>
					<ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
				</InputWrapper>
				<Button>회원가입</Button>
				<P>
					계정이 있으신가요? <Link href="/signup">로그인하기</Link>
				</P>
			</Form>
		</Wrapper>
	);
};

export default SignupForm;
