import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Icons */
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';

/* @Components */
import DashboardWrapperComponent from './DashboardWrapperComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import { createCompanyAction, deleteCompanyAction } from '../../store/company/actions';

/* @Styles */
import styles from './DashboardWrapper.module.css';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
    createCompany: func,
    deleteCompany: func
};

const DashboardWrapperContainer = ({ createCompany, deleteCompany }) => {
    const intl = useIntl();
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

        notification('warning', message);
    };

    const handleCancel = () => {
        setIsShowCreateCompanyModal(false);
        setIsShowDeleteCompanyModal(false);
    };

    const menuNodes = [
        <div className={styles.nodeWrapper} key="1" onClick={showCreateCompanyModal}>
            <AppstoreAddOutlined />
            <div className={styles.nodeTitle}>{intl.formatMessage({ id: 'company.create' })}</div>
        </div>,
        <div className={styles.nodeWrapper} key="2" onClick={showDeleteCompanyModal}>
            <DeleteOutlined />
            <div className={styles.nodeTitle}>{intl.formatMessage({ id: 'company.delete' })}</div>
        </div>
    ];

    return (
        <DashboardWrapperComponent
            menuNodes={menuNodes}
            isShowCreateCompanyModal={isShowCreateCompanyModal}
            isShowDeleteCompanyModal={isShowDeleteCompanyModal}
            handleSubmitCreateCompanyModal={handleSubmitCreateCompanyModal}
            handleSubmitDeleteCompanyModal={handleSubmitDeleteCompanyModal}
            handleCancel={handleCancel}
        />
    );
};

DashboardWrapperContainer.propTypes = propTypes;

DashboardWrapperContainer.displayName = 'DashboardWrapperContainer';

const mapDispatchToProps = {
    createCompany: createCompanyAction,
    deleteCompany: deleteCompanyAction
};

export default connect(null, mapDispatchToProps)(DashboardWrapperContainer);
