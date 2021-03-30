import React, { useEffect, useState } from 'react';
import { array, func, object, number } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { push } from 'connected-react-router';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Icons */
import { ControlOutlined } from '@ant-design/icons';

/* @Actions */
import {
    getCompaniesAction,
    setCurrentCompanyIdAction,
    deleteCompanyAction,
    createCompanyAction,
    updateCompanyAction
} from '../../store/company/actions';

/* @Styles */
import styles from './Menu.module.css';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
    getCompanies: func,
    setCurrentCompanyId: func,
    deleteCompany: func,
    createCompany: func,
    updateCompany: func,
    goTo: func,
    companiesIds: array,
    companiesById: object,
    currentCompanyId: number
};

const MenuContainer = ({
    getCompanies,
    setCurrentCompanyId,
    deleteCompany,
    createCompany,
    updateCompany,
    goTo,
    companiesIds,
    companiesById,
    currentCompanyId
}) => {
    const intl = useIntl();
    const { companyId } = useParams();

    useEffect(() => {
        getCompanies();

        if (companyId) {
            setCurrentCompanyId(parseInt(companyId));
        }
    }, []);

    const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
    const [showUpdateCompanyModal, setShowUpdateCompanyModal] = useState(false);

    const onOpenCreateCompanyModal = () => setShowCreateCompanyModal(true);

    const menuItem = [
        {
            title: (
                <div className={styles.titleMenu} onClick={onOpenCreateCompanyModal}>
                    <span>{intl.formatMessage({ id: 'companies' })}</span>
                    <ControlOutlined className={styles.titleMenuIcon} />
                </div>
            ),
            items: companiesIds
        }
    ];

    const handleCloseCreateCompanyModal = () => setShowCreateCompanyModal(false);
    const handleCloseUpdateCompanyModal = () => setShowUpdateCompanyModal(false);

    const handleClick = ({ key }) => setCurrentCompanyId(parseInt(key));

    const handleDeleteClick = async (id) => {
        const { isSuccess, message } = await deleteCompany(id);

        if (isSuccess) {
            notification('success', intl.formatMessage({ id: message }));
            setCurrentCompanyId(null);
            goTo('/dashboard');
            return;
        }

        notification('warning', intl.formatMessage({ id: message }));
    };

    const handleSubmitUpdateCompanyModal = async (values) => {
        const { isSuccess, message } = await updateCompany({ ...values, id: currentCompanyId });

        if (isSuccess) {
            setShowUpdateCompanyModal(false);
            notification('success', intl.formatMessage({ id: message }));
            return;
        }

        notification('warning', intl.formatMessage({ id: message }));
    };

    const handleSubmitCreateCompanyModal = async (values) => {
        const { isSuccess, message } = await createCompany(values);

        if (isSuccess) {
            setShowCreateCompanyModal(false);
            notification('success', intl.formatMessage({ id: message }));
            return;
        }

        notification('warning', intl.formatMessage({ id: message }));
    };

    const handleDropdownMenuClick = ({ key }) => {
        if (key === 'delete') {
            handleDeleteClick(currentCompanyId);
        }

        if (key === 'edit') {
            setShowUpdateCompanyModal(true);
        }
    };

    return (
        <MenuComponent
            intl={intl}
            menuItem={menuItem}
            onClick={handleClick}
            companyId={companyId}
            companiesById={companiesById}
            showCreateCompanyModal={showCreateCompanyModal}
            showUpdateCompanyModal={showUpdateCompanyModal}
            onCloseCreateCompanyModal={handleCloseCreateCompanyModal}
            onCloseUpdateCompanyModal={handleCloseUpdateCompanyModal}
            onSubmitCreateCompanyModal={handleSubmitCreateCompanyModal}
            onSubmitUpdateCompanyModal={handleSubmitUpdateCompanyModal}
            onDropdownMenuClick={handleDropdownMenuClick}
        />
    );
};

MenuContainer.propTypes = propTypes;

MenuContainer.displayName = 'MenuContainer';

MenuContainer.defaultProps = {
    companies: []
};

const mapStateToProps = ({ companies }) => ({
    companiesById: companies.byId,
    companiesIds: companies.allIds,
    currentCompanyId: companies.currentCompanyId
});

const mapDispatchToProps = {
    getCompanies: getCompaniesAction,
    setCurrentCompanyId: setCurrentCompanyIdAction,
    deleteCompany: deleteCompanyAction,
    createCompany: createCompanyAction,
    updateCompany: updateCompanyAction,
    goTo: push
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
