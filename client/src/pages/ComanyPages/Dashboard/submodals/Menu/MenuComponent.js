import React from 'react';
import { array, func } from 'prop-types';

/* @Antd */
import { Menu } from 'antd';

/* @Styles */
import styles from './Menu.module.css';

const { SubMenu, Item } = Menu;

const propTypes = {
	regions: array,
	selectedKeys: array,
	onClick: func,
};

const MenuComponent = ({ regions, selectedKeys, onClick }) => {
	return (
		<div>
			<Menu
				onClick={onClick}
				selectedKeys={selectedKeys}
				mode="inline"
				className={styles.menu}
			>
				{regions.map(({ id, name, fields = [] }) => (
					<SubMenu key={id} title={name}>
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
