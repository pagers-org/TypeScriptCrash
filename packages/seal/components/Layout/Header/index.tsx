import React, { ChangeEvent, useState } from 'react';
import { Menu } from 'types';
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
					<svg
						className="explore"
						width="50"
						height="50"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M4 4H8V8H4V4Z" fill="currentColor" />
						<path d="M4 10H8V14H4V10Z" fill="currentColor" />
						<path d="M8 16H4V20H8V16Z" fill="currentColor" />
						<path d="M10 4H14V8H10V4Z" fill="currentColor" />
						<path d="M14 10H10V14H14V10Z" fill="currentColor" />
						<path d="M10 16H14V20H10V16Z" fill="currentColor" />
						<path d="M20 4H16V8H20V4Z" fill="currentColor" />
						<path d="M16 10H20V14H16V10Z" fill="currentColor" />
						<path d="M20 16H16V20H20V16Z" fill="currentColor" />
					</svg>
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
					<svg
						width="50"
						height="50"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M19 20H17.1717L12.7072 15.5354C12.3166 15.1449 11.6835 15.1449 11.2929 15.5354L6.82843 20L5 20V7C5 5.34315 6.34315 4 8 4H16C17.6569 4 19 5.34314 19 7V20ZM17 7C17 6.44772 16.5523 6 16 6H8C7.44772 6 7 6.44772 7 7V17L9.87873 14.1212C11.0503 12.9497 12.9498 12.9497 14.1214 14.1212L17 16.9999V7Z"
							fill="currentColor"
						/>
					</svg>
				</Label>
			</Nav>
		</header>
	);
};

export default Header;
