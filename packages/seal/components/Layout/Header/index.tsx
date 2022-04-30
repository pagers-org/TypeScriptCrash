import React, { ChangeEvent, useState } from 'react';
import { Menu } from 'types';
import { Icon } from '@iconify/react';
import { Label, Nav, Input } from './index.styles';

const Header = () => {
	const [selectedMenu, setSelectedMenu] = useState<Menu>('explore');

	const handleClickMenu = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedMenu(e.target.value as Menu);
	};

	return (
		<header>
			<Nav>
				<Label
					data-label="explore"
					isChecked={selectedMenu === 'explore'}
					selectedMenu={selectedMenu}
				>
					<Input
						type="radio"
						value="explore"
						checked={selectedMenu === 'explore'}
						onChange={handleClickMenu}
					/>
					<Icon icon="ic:baseline-apps" />
				</Label>
				<Label
					data-label="saved"
					isChecked={selectedMenu === 'saved'}
					selectedMenu={selectedMenu}
				>
					<Input
						type="radio"
						value="saved"
						checked={selectedMenu === 'saved'}
						onChange={handleClickMenu}
					/>
					<Icon icon="eva:bookmark-outline" />
				</Label>
			</Nav>
		</header>
	);
};

export default Header;
