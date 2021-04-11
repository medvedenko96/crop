import React from 'react';
import { func, object, bool, array, string } from 'prop-types';

/* @Antd */
import { Tabs, PageHeader } from 'antd';

/* @Components */
import FieldsList from 'components/FieldsList';
import FieldInfo from 'components/FieldInfo';
import { CreateYearModal } from 'components/Modals';

/* @Styles */
import styles from './FieldPage.module.css';

const { TabPane } = Tabs;

const propTypes = {
	intl: object,
	isShowCreateYearModal: bool,
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
	isShowCreateYearModal,
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
				<PageHeader title="Dashboard" className={styles.header} onBack={onBackClick} />
				<div className={styles.content}>
					<div className={styles.fieldsListWrapper}>
						<FieldsList />
					</div>
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
		</>
	);
};

FieldPageComponent.propTypes = propTypes;

FieldPageComponent.displayName = 'FieldPageComponent';

FieldPageComponent.defaultProps = {
	activeYear: '',
};

export default FieldPageComponent;
