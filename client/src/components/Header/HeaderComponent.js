import React from 'react';
import { connect } from 'react-redux';

/* @Antd */
import { Row, Col } from 'antd';

/* @Icons */
import UserOutlined from '@ant-design/icons/UserOutlined';

import styles from './Header.module.css';

const propTypes = {};

const HeaderComponent = () => {
	return (
		<div className={styles.headerWrapper}>
			<Row>
				<Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
					<h1 className={styles.logo}>
						Crop Time{' '}
						<sup>
							<small>.org</small>
						</sup>
					</h1>
				</Col>
				<Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
					<div className={styles.header}>
						<UserOutlined />
					</div>
				</Col>
			</Row>
		</div>
	);
};

HeaderComponent.propTypes = propTypes;

HeaderComponent.defaultProps = {};

export default connect(null, null)(HeaderComponent);
