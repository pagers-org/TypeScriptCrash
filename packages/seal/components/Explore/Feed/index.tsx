import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { Icon } from '@iconify/react';
import { getLocalStorage } from 'utils/localStorage';
import useAddBookmark from 'hooks/mutation/useAddBookmark';
import {
	ButtonWrapper,
	IconWrapper,
	Input,
	Label,
	Wrapper,
} from './index.styles';

interface Props {
	imageUrl: string;
	isChecked?: boolean;
}

const Feed = ({ imageUrl, isChecked }: Props) => {
	const [checked, setChecked] = useState(Boolean(isChecked));

	const handleChangeHeartIcon = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(Boolean(e.target.checked));
	};

	const { mutate } = useAddBookmark();

	const handleClickHeartIcon = () => {
		const filename = imageUrl.split('/').pop()?.split('.').shift() as string;
		mutate({
			_id: getLocalStorage('user_token'),
			filename,
		});
	};

	return (
		<Wrapper>
			<ButtonWrapper>
				<IconWrapper>
					<Label checked={checked}>
						<Input
							type="checkbox"
							checked={checked}
							onChange={handleChangeHeartIcon}
						/>
						<Icon
							icon="ci:heart-fill"
							width={25}
							height={25}
							onClick={handleClickHeartIcon}
						/>
					</Label>
				</IconWrapper>
			</ButtonWrapper>
			<Image src={imageUrl} width={460} height={460} />
		</Wrapper>
	);
};

export default Feed;
