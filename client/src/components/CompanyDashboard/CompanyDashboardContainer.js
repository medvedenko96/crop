import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

/* @Icons */
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';

/* @Components */
import CompanyDashboardComponent from './CompanyDashboardComponent';

/* @Actions */
import { createCompanyAction, deleteCompanyAction } from '../../store/actions/company';

/* @Styles */
import styles from './CompanyDashboard.module.css';

const propTypes = {
  createCompany: func,
};

const CompanyDashboardContainer = ({ createCompany }) => {
  const [isShowCreateCompanyModal, setIsShowCreateCompanyModal] = useState(false);
  const [isShowDeleteCompanyModal, setIsShowDeleteCompanyModal] = useState(false);

  const showCreateCompanyModal = () => {
    setIsShowCreateCompanyModal(true);
  };

  const handleSubmitCreateCompanyModal = (values) => {
    createCompany(values);
    setIsShowCreateCompanyModal(false);
  };

  const handleSubmitDeleteCompanyModal = (values) => {
    setIsShowCreateCompanyModal(false);
  };

  const handleCancel = () => {
    setIsShowCreateCompanyModal(false);
    setIsShowDeleteCompanyModal(false);
  };

  const menuNodes = [
    <div className={styles.nodeWrapper} key="1" onClick={showCreateCompanyModal}>
      <AppstoreAddOutlined />
      <div className={styles.nodeTitle}>Add Company</div>
    </div>,
    <div className={styles.nodeWrapper} key="2" onClick={setIsShowDeleteCompanyModal}>
      <DeleteOutlined />
      <div className={styles.nodeTitle}>Delete Company</div>
    </div>,
  ];

  return (
    <CompanyDashboardComponent
      menuNodes={menuNodes}
      isShowCreateCompanyModal={isShowCreateCompanyModal}
      isShowDeleteCompanyModal={isShowDeleteCompanyModal}
      handleSubmitCreateCompanyModal={handleSubmitCreateCompanyModal}
      handleSubmitDeleteCompanyModal={handleSubmitDeleteCompanyModal}
      handleCancel={handleCancel}
    />
  );
};

CompanyDashboardContainer.propTypes = propTypes;

const actions = {
  createCompany: createCompanyAction,
  deleteCompany: deleteCompanyAction,
};

export default connect(null, actions)(CompanyDashboardContainer);
