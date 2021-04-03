import React from 'react';
import { array, func, string, object, bool } from 'prop-types';
import { Link } from 'react-router-dom';

/* @Antd */
import { Menu, Dropdown } from 'antd';

/* @Components */
import { CreateCompanyModal, UpdateCompanyModal } from '../Modals';

/* @Icons */
import { AppstoreAddOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';

/* @Styles */
import styles from './Menu.module.css';
import './Menu.css';

const { ItemGroup, Item } = Menu;

const propTypes = {
	intl: object,
	onClick: func,
	menuItem: array,
	companyId: string,
	companiesById: object,
	showCreateCompanyModal: bool,
	showUpdateCompanyModal: bool,
	onCloseCreateCompanyModal: func,
	onCloseUpdateCompanyModal: func,
	onSubmitCreateCompanyModal: func,
	onSubmitUpdateCompanyModal: func,
	onDropdownMenuClick: func,
};

const MenuComponent = ({
	intl,
	menuItem,
	onClick,
	companyId,
	companiesById,
	showCreateCompanyModal,
	showUpdateCompanyModal,
	onCloseCreateCompanyModal,
	onCloseUpdateCompanyModal,
	onSubmitCreateCompanyModal,
	onSubmitUpdateCompanyModal,
	onDropdownMenuClick,
}) => {
	const menu = (
		<Menu onClick={onDropdownMenuClick}>
			<Item icon={<AppstoreAddOutlined />} key="edit">
				<span>{intl.formatMessage({ id: 'company.update' })}</span>
			</Item>
			<Item icon={<DeleteOutlined />} key="delete">
				<span>{intl.formatMessage({ id: 'company.delete' })}</span>
			</Item>
		</Menu>
	);

	return (
		<>
			<Menu onClick={onClick} selectedKeys={[companyId]}>
				{menuItem.map((el) => (
					<ItemGroup key={el.title} title={el.title}>
						{el.items.map((id) => {
							return (
								<Item key={id} className={styles.itemWrapper}>
									<Link to={`/dashboard/${id}`}>{companiesById[id].name}</Link>
									{parseInt(companyId) === id && (
										<Dropdown overlay={menu}>
											<EllipsisOutlined className={styles.iconWrapper} />
										</Dropdown>
									)}
								</Item>
							);
						})}
					</ItemGroup>
				))}
			</Menu>
			<CreateCompanyModal
				isShowModal={showCreateCompanyModal}
				onOk={onSubmitCreateCompanyModal}
				handleCancel={onCloseCreateCompanyModal}
			/>
			<UpdateCompanyModal
				isShowModal={showUpdateCompanyModal}
				onOk={onSubmitUpdateCompanyModal}
				handleCancel={onCloseUpdateCompanyModal}
				companyInfo={companiesById[companyId]}
			/>
		</>
	);
};

MenuComponent.propTypes = propTypes;

export default MenuComponent;
