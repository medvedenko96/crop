import React from 'react';

/* @Antd */
import { Row, Col } from 'antd';

/* @Components */
import Menu from './submodals/Menu';
import Tabs from './submodals/Tabs';
import Header from 'components/Header';

/* @Styles */
import styles from './Dashboard.module.css';

const propTypes = {};

const DashboardComponent = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.mainWrapper}>
				<Row>
					<Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
						<Menu />
					</Col>
					<Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
						<Tabs />
					</Col>
				</Row>
			</div>
		</div>
	);
};

DashboardComponent.propTypes = propTypes;

DashboardComponent.displayName = 'DashboardComponent';

export default DashboardComponent;
