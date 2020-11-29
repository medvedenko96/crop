import React, { useState } from 'react';
import { connect } from 'react-redux';

/* @Icons */
import { AppstoreAddOutlined } from '@ant-design/icons';

/* @Components */
import CompanyDashboardComponent from './CompanyDashboardComponent';

/* @Actions */
import { createCompanyAction } from '../../store/actions/company';

/* @Styles */
import styles from './CompanyDashboard.module.css';

const CompanyDashboardContainer = ({ createCompany }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => {
    setIsShowModal(true);
  };

  const handleOk = values => {
    createCompany(values)
    setIsShowModal(false);
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };

  const menuNodes = [
    <div className={styles.nodeWrapper} key='1' onClick={showModal}>
      <AppstoreAddOutlined />
      <div className={styles.nodeTitle}>Add Company</div>
    </div>,
  ]

  return <CompanyDashboardComponent
    menuNodes={menuNodes}
    isShowModal={isShowModal}
    handleOk={handleOk}
    handleCancel={handleCancel}
  />;
};

const actions = {
  createCompany: createCompanyAction
};

export default connect(null, actions)(CompanyDashboardContainer);
