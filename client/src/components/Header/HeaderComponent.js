import React from 'react';
import { connect } from 'react-redux';

/* @Antd */
import { Row, Col } from 'antd';

import Logo from 'static/images/logo.png';
import styles from './Header.module.css';

const propTypes = {};

const HeaderComponent = () => {
	return (
		<div className={styles.headerWrapper}>
			<Row>
				<Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
					<img className={styles.logo} src={Logo} alt="Logo" />
				</Col>
				<Col xs={24} sm={24} md={18} lg={18} xl={19} xxl={20}>
					<div className={styles.header} />
				</Col>
			</Row>
		</div>
	);
};

HeaderComponent.propTypes = propTypes;

HeaderComponent.defaultProps = {};

export default connect(null, null)(HeaderComponent);
