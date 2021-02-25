import React from 'react';
import { func, array, bool } from 'prop-types';

/* @Components */
import MagicButton from '../MagicButton';
import { CreateCompanyModal, DeleteCompanyModal } from '../Modals';

/* @Styles */
import styles from './CompanyDashboard.module.css';

const propTypes = {
  menuNodes: array,
  isShowCreateCompanyModal: bool,
  isShowDeleteCompanyModal: bool,
  handleSubmitCreateCompanyModal: func,
  handleSubmitDeleteCompanyModal: func,
  handleCancel: func,
};

const CompanyDashboardComponent = ({
  menuNodes,
  isShowCreateCompanyModal,
  isShowDeleteCompanyModal,
  handleSubmitCreateCompanyModal,
  handleSubmitDeleteCompanyModal,
  handleCancel,
}) => (
  <>
    <div className={styles.dashboardWrapper}>
      DashboardPage
      <MagicButton menuNodes={menuNodes} />
    </div>
    <CreateCompanyModal
      isShowModal={isShowCreateCompanyModal}
      onOk={handleSubmitCreateCompanyModal}
      handleCancel={handleCancel}
    />
    <DeleteCompanyModal
      isShowModal={isShowDeleteCompanyModal}
      onOk={handleSubmitDeleteCompanyModal}
      handleCancel={handleCancel}
    />
  </>
);

CompanyDashboardComponent.propTypes = propTypes;

export default CompanyDashboardComponent;
