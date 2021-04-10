import React from 'react';

/* @Antd */
import { Row, Col } from 'antd';

/* @Components */
import Menu from 'components/Menu';
import Dashboard from 'components/DashboardContent';
import Header from 'components/Header';

/* @Styles */
import styles from './DashboardPage.module.css';

const DashboardPageComponent = () => (
	<div className={styles.wrapper}>
		<Header />
		<div className={styles.mainWrapper}>
			<Row>
				<Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
					<Menu />
				</Col>
				<Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
					<Dashboard />
				</Col>
			</Row>
		</div>
	</div>
);

export default DashboardPageComponent;
