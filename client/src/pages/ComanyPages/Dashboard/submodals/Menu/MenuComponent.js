import React from 'react';
import { array, func } from 'prop-types';

/* @Antd */
import { Menu } from 'antd';

/* @Styles */
import styles from './Menu.module.css';

const { SubMenu, Item } = Menu;

const propTypes = {
	regions: array,
	onSubMenuClick: func,
};

const MenuComponent = ({ regions, onSubMenuClick }) => {
	return (
		<div>
			<Menu onClick={onSubMenuClick} mode="inline" className={styles.wrapper}>
				{regions.map(({ id, name, fields = [] }) => (
					<SubMenu onTitleClick={onSubMenuClick} key={id} title={name}>
						{fields.map(({ id, name }) => (
							<Item key={id}>{name}</Item>
						))}
					</SubMenu>
				))}
			</Menu>
		</div>
	);
};

MenuComponent.propTypes = propTypes;

MenuComponent.displayName = 'MenuComponent';

export default MenuComponent;
