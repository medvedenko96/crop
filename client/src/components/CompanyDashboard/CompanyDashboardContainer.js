import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

/* @Icons */
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';

/* @Components */
import CompanyDashboardComponent from './CompanyDashboardComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import { createCompanyAction, deleteCompanyAction } from '../../store/actions/company';

/* @Styles */
import styles from './CompanyDashboard.module.css';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
  createCompany: func,
  deleteCompany: func,
};

const CompanyDashboardContainer = ({ createCompany, deleteCompany }) => {
  const [isShowCreateCompanyModal, setIsShowCreateCompanyModal] = useState(false);
  const [isShowDeleteCompanyModal, setIsShowDeleteCompanyModal] = useState(false);

  const showCreateCompanyModal = () => {
    setIsShowCreateCompanyModal(true);
  };

  const showDeleteCompanyModal = () => {
    setIsShowDeleteCompanyModal(true);
  };

  const handleSubmitCreateCompanyModal = (values) => {
    createCompany(values);
    setIsShowCreateCompanyModal(false);
  };

  const handleSubmitDeleteCompanyModal = async (values) => {
    const { message, isSuccess } = await deleteCompany(values);

    if (isSuccess) {
      setIsShowDeleteCompanyModal(false);
      notification('success', message);
      return;
    }

    notification('error', message);
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
    <div className={styles.nodeWrapper} key="2" onClick={showDeleteCompanyModal}>
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
