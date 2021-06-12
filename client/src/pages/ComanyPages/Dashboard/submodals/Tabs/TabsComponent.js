import React from 'react';
import { array, object, func, number } from 'prop-types';

/* @Antd */
import { Tabs } from 'antd';
import { Empty } from 'antd';

/* @Components */
import FieldInfo from '../FieldInfo';

/* @Styles */
import styles from './Tabs.module.css';

const { TabPane } = Tabs;

const propTypes = {
	intl: object,
	currentYearId: number,
	currentYears: array,
	onTabClick: func,
};

const TabsComponent = ({ intl, currentYearId, currentYears, onTabClick }) => {
	return (
		<div className={styles.wrapper}>
			{currentYears?.length > 0 ? (
				<Tabs onTabClick={onTabClick} activeKey={currentYearId?.toString()}>
					{currentYears.map(({ id, year }) => (
						<TabPane key={id} tab={year}>
							<FieldInfo currentYearId={currentYearId} />
						</TabPane>
					))}
				</Tabs>
			) : (
				<div className={styles.empty}>
					<Empty description={intl.formatMessage({ id: 'empty' })} />
				</div>
			)}
		</div>
	);
};

TabsComponent.defaultProps = {};
TabsComponent.propTypes = propTypes;
TabsComponent.displayName = 'TabsComponent';

export default TabsComponent;
