import React, { ChangeEvent, useState } from 'react';
import { Menu } from 'types';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import { Label, Ul, Input, Wrapper } from './index.styles';

const Header = () => {
	const router = useRouter();

	const [selectedMenu, setSelectedMenu] = useState<Menu>(
		router.pathname === '/' ? 'explore' : 'saved',
	);

	const handleClickMenu = (e: ChangeEvent<HTMLInputElement>, path: string) => {
		setSelectedMenu(e.target.value as Menu);
		router.push(path);
	};

	return (
		<Wrapper>
			<nav>
				<Ul>
					<li>
						<Label
							data-label="explore"
							isChecked={selectedMenu === 'explore'}
							selectedMenu={selectedMenu}
						>
							<Input
								type="radio"
								value="explore"
								checked={selectedMenu === 'explore'}
								onChange={(e) => handleClickMenu(e, '/')}
							/>
							<Icon icon="ic:baseline-apps" />
						</Label>
					</li>
					<li>
						<Label
							data-label="saved"
							isChecked={selectedMenu === 'saved'}
							selectedMenu={selectedMenu}
						>
							<Input
								type="radio"
								value="saved"
								checked={selectedMenu === 'saved'}
								onChange={(e) => handleClickMenu(e, '/bookmark')}
							/>
							<Icon icon="eva:bookmark-outline" />
						</Label>
					</li>
				</Ul>
			</nav>
		</Wrapper>
	);
};

export default Header;
