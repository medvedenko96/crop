import React from 'react';

/* @Components */
import MagicButton from '../MagicButton';
import AddCompanyModal from '../Modals/AddCopmany';

/* @Styles */
import styles from './CompanyDashboard.module.css';

const CompanyDashboardComponent = ({ menuNodes, isShowModal, handleOk, handleCancel }) => (
  <>
    <div className={styles.dashboardWrapper}>
      DashboardPage
      <MagicButton menuNodes={menuNodes} />
    </div>
    <AddCompanyModal isShowModal={isShowModal} onOk={handleOk} handleCancel={handleCancel} />
  </>
);

export default CompanyDashboardComponent;
