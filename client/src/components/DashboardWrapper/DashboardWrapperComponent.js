import React from 'react';
import { func, array, bool } from 'prop-types';

/* @Components */
import MagicButton from '../MagicButton';
import { CreateCompanyModal, DeleteCompanyModal } from '../Modals';
import DashboardContent from '../DashboardContent';

/* @Styles */
import styles from './DashboardWrapper.module.css';

const propTypes = {
  menuNodes: array,
  isShowCreateCompanyModal: bool,
  isShowDeleteCompanyModal: bool,
  handleSubmitCreateCompanyModal: func,
  handleSubmitDeleteCompanyModal: func,
  handleCancel: func,
};

const DashboardWrapperComponent = ({
  menuNodes,
  isShowCreateCompanyModal,
  isShowDeleteCompanyModal,
  handleSubmitCreateCompanyModal,
  handleSubmitDeleteCompanyModal,
  handleCancel,
}) => (
  <>
    <div className={styles.dashboardWrapper}>
      <DashboardContent />
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

DashboardWrapperComponent.propTypes = propTypes;

export default DashboardWrapperComponent;
