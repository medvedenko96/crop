import React from 'react';

/* @Components */
import DashboardContent from '../DashboardContent';

/* @Styles */
import styles from './DashboardWrapper.module.css';

const DashboardWrapperComponent = () => (
    <>
        <div className={styles.dashboardWrapper}>
            <DashboardContent />
        </div>
    </>
);

export default DashboardWrapperComponent;
