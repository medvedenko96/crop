import React from 'react';
import { array, func, number, object, bool } from 'prop-types';

/* @Antd */
import { Menu, Dropdown } from 'antd';

/* @Components */
import {
	CreateCompanyModal,
	UpdateCompanyModal,
	UpdateCompanyPasswordModal,
} from 'components/Modals';

/* @Icons */
import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import UnlockOutlined from '@ant-design/icons/UnlockOutlined';

/* @Styles */
import styles from './Menu.module.css';
import './Menu.css';

const { ItemGroup, Item } = Menu;

const propTypes = {
	intl: object,
	onClick: func,
	menuItem: array,
	companyId: number,
	companiesById: object,
	showCreateCompanyModal: bool,
	showUpdateCompanyModal: bool,
	showUpdateCompanyPasswordModal: bool,
	onCloseCreateCompanyModal: func,
	onCloseUpdateCompanyModal: func,
	onCloseUpdateCompanyPasswordModal: func,
	onSubmitCreateCompanyModal: func,
	onSubmitUpdateCompanyModal: func,
	onSubmitUpdateCompanyPasswordModal: func,
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
	showUpdateCompanyPasswordModal,
	onCloseCreateCompanyModal,
	onCloseUpdateCompanyModal,
	onCloseUpdateCompanyPasswordModal,
	onSubmitCreateCompanyModal,
	onSubmitUpdateCompanyModal,
	onSubmitUpdateCompanyPasswordModal,
	onDropdownMenuClick,
}) => {
	const menu = (
		<Menu onClick={onDropdownMenuClick}>
			<Item icon={<AppstoreAddOutlined />} key="update">
				<span>{intl.formatMessage({ id: 'company.update' })}</span>
			</Item>
			<Item icon={<UnlockOutlined />} key="updatePassword">
				<span>{intl.formatMessage({ id: 'company.updatePassword' })}</span>
			</Item>
			<Item icon={<DeleteOutlined />} key="delete">
				<span>{intl.formatMessage({ id: 'company.delete' })}</span>
			</Item>
		</Menu>
	);

	return (
		<>
			<Menu onClick={onClick} selectedKeys={[companyId?.toString()]} className={styles.menu}>
				{menuItem.map((el) => (
					<ItemGroup key={el.title} title={el.title}>
						{el.items.map((id) => {
							return (
								<Item key={id} className={styles.itemWrapper}>
									<div>{companiesById[id].name}</div>
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
				intl={intl}
				isShowModal={showCreateCompanyModal}
				onOk={onSubmitCreateCompanyModal}
				handleCancel={onCloseCreateCompanyModal}
			/>
			<UpdateCompanyModal
				intl={intl}
				isShowModal={showUpdateCompanyModal}
				onOk={onSubmitUpdateCompanyModal}
				handleCancel={onCloseUpdateCompanyModal}
				companyInfo={companiesById[companyId]}
			/>
			<UpdateCompanyPasswordModal
				intl={intl}
				isShowModal={showUpdateCompanyPasswordModal}
				onOk={onSubmitUpdateCompanyPasswordModal}
				handleCancel={onCloseUpdateCompanyPasswordModal}
			/>
		</>
	);
};

MenuComponent.propTypes = propTypes;

export default MenuComponent;
