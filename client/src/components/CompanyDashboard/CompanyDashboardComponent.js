import React from 'react';
import { func, array, bool } from 'prop-types';

/* @Components */
import MagicButton from '../MagicButton';
import AddCompanyModal from '../Modals/AddCopmany';

/* @Styles */
import styles from './CompanyDashboard.module.css';

const propTypes = {
  menuNodes: array,
  isShowModal: bool,
  handleOk: func,
  handleCancel: func,
};

const CompanyDashboardComponent = ({ menuNodes, isShowModal, handleOk, handleCancel }) => (
  <>
    <div className={styles.dashboardWrapper}>
      DashboardPage
      <MagicButton menuNodes={menuNodes} />
    </div>
    <AddCompanyModal isShowModal={isShowModal} onOk={handleOk} handleCancel={handleCancel} />
  </>
);

CompanyDashboardComponent.propTypes = propTypes;

export default CompanyDashboardComponent;
