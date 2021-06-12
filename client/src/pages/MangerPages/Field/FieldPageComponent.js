import React from 'react';
import { func, object, bool, array, string, shape } from 'prop-types';

/* @Antd */
import { Tabs, PageHeader, Drawer } from 'antd';

/* @Components */
import FieldsList from 'components/FieldsList';
import FieldInfo from 'components/FieldInfo';
import { CreateYearModal } from 'components/Modals';

/* @Icons */
import RightOutlined from '@ant-design/icons/RightOutlined';

/* @Styles */
import styles from './FieldPage.module.css';

const { TabPane } = Tabs;

const propTypes = {
	intl: object,
	currentRegion: shape({ name: string }),
	currentCompany: shape({ name: string }),
	isShowCreateYearModal: bool,
	isShowDrawer: bool,
	onShowDrawer: func,
	onCloseDrawer: func,
	onActionsOnTab: func,
	onCancel: func,
	onSubmitCreateYearModal: func,
	onTabClick: func,
	onBackClick: func,
	activeYear: string,
	years: array,
};

const FieldPageComponent = ({
	intl,
	currentRegion,
	currentCompany,
	isShowCreateYearModal,
	isShowDrawer,
	onShowDrawer,
	onCloseDrawer,
	onActionsOnTab,
	onCancel,
	onSubmitCreateYearModal,
	onTabClick,
	onBackClick,
	activeYear,
	years,
}) => {
	return (
		<>
			<div className={styles.wrapper}>
				<PageHeader title="Dashboard" className={styles.header} onBack={onBackClick}>
					<div className={styles.subHeader}>
						<div className={styles.subHeaderItem}>
							<div className={styles.subHeaderItemTitle}>
								{intl.formatMessage({ id: 'company._' })}
							</div>
							<div className={styles.subHeaderItemText}>{currentCompany.name}</div>
						</div>
						<div className={styles.subHeaderItem}>
							<div className={styles.subHeaderItemTitle}>
								{intl.formatMessage({ id: 'region._' })}
							</div>
							<div className={styles.subHeaderItemText}>{currentRegion.name}</div>
						</div>
					</div>
				</PageHeader>
				<div className={styles.content}>
					<RightOutlined onClick={onShowDrawer} className={styles.iconOpenDrawer} />
					<div className={styles.tabsWrapper}>
						<Tabs
							type="editable-card"
							onEdit={onActionsOnTab}
							onChange={onTabClick}
							activeKey={activeYear}
						>
							{years.map(({ year, id }) => (
								<TabPane tab={year} key={id}>
									<FieldInfo />
								</TabPane>
							))}
						</Tabs>
					</div>
				</div>
			</div>
			<CreateYearModal
				intl={intl}
				isShowModal={isShowCreateYearModal}
				onOk={onSubmitCreateYearModal}
				handleCancel={onCancel}
			/>
			<Drawer
				placement="left"
				width={420}
				closable={false}
				onClose={onCloseDrawer}
				visible={isShowDrawer}
			>
				<div className={styles.fieldsListWrapper}>
					<FieldsList isFieldPage />
				</div>
			</Drawer>
		</>
	);
};

FieldPageComponent.propTypes = propTypes;

FieldPageComponent.displayName = 'FieldPageComponent';

FieldPageComponent.defaultProps = {
	activeYear: '',
	currentRegion: {
		name: '',
	},
	currentCompany: {
		name: '',
	},
};

export default FieldPageComponent;
