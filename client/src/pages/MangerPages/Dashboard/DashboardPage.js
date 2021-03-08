import React from 'react';

/* @Antd */
import { Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/* @Components */
import Menu from '../../../components/Menu';
import Dashboard from '../../../components/DashboardWrapper';

/* @Styles */
import styles from './DashboardPage.module.css';

const DashboardPage = () => (
  <div className={styles.wrapper}>
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

export default DashboardPage;
