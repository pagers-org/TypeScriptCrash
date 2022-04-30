import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { Icon } from '@iconify/react';
import {
	ButtonWrapper,
	IconWrapper,
	Input,
	Label,
	Wrapper,
} from './index.styles';

interface Props {
	imageUrl: string;
}

const Feed = ({ imageUrl }: Props) => {
	const [checked, setChecked] = useState(false);

	const handleChangeHeartIcon = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(Boolean(e.target.checked));
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
						<Icon icon="ci:heart-fill" width={25} height={25} />
					</Label>
				</IconWrapper>
			</ButtonWrapper>
			<Image src={imageUrl} width={460} height={460} />
		</Wrapper>
	);
};

export default Feed;
