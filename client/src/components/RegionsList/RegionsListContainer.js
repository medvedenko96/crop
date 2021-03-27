import React, { useEffect, useState } from 'react';
import { func, number, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

/* @Components */
import RegionsListComponent from './RegionsListComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import {
    createRegionAction,
    deleteRegionAction,
    getRegionsAction,
    updateRegionAction,
    setCurrentRegionIdAction
} from '../../store/region/actions';
import { setCurrentFieldIdAction } from '../../store/field/actions';

/* @Selectors */
import { getRegionsSelector } from '../../store/region/selectors';
import { getCurrentCompanySelector } from '../../store/company/selectors';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
    createRegion: func,
    getRegions: func,
    deleteRegion: func,
    updateRegion: func,
    setCurrentRegionId: func,
    setCurrentFieldId: func,
    goTo: func,
    company: shape({
        id: number,
        name: string
    }),
    currentRegionId: number,
    regionsById: object,
    regionsIds: object
};

const RegionsListContainer = ({
    createRegion,
    getRegions,
    deleteRegion,
    updateRegion,
    setCurrentRegionId,
    setCurrentFieldId,
    goTo,
    company,
    currentRegionId,
    regionsById,
    regionsIds
}) => {
    const { id: currentCompanyId = null } = company;

    useEffect(() => {
        if (!!currentCompanyId && !regionsIds[currentCompanyId]) {
            getRegions(currentCompanyId);
        }
    }, [currentCompanyId]);

    const [isShowCreateRegionModal, setIsShowCreateRegionModal] = useState(false);
    const [isShowUpdateRegionModal, setIsShowUpdateRegionModal] = useState(false);

    const handleOpenCreateRegionModal = () => {
        setIsShowCreateRegionModal(true);
    };

    const handleSubmitCreateRegionModal = async (values) => {
        const { message, isSuccess } = await createRegion({ ...values, companyId: company.id });

        if (isSuccess) {
            notification('success', message);
            setIsShowCreateRegionModal(false);
            return;
        }

        notification('warning', message);
    };

    const handleUpdateRegionModal = async (values) => {
        if (!currentRegionId) {
            notification('error', 'error');
            return;
        }

        const { message, isSuccess } = await updateRegion({
            ...values,
            regionId: currentRegionId,
            companyId: currentCompanyId
        });

        if (isSuccess) {
            notification('success', message);
            setIsShowUpdateRegionModal(false);
            return;
        }

        notification('warning', message);
    };

    const handleCancel = () => {
        setIsShowCreateRegionModal(false);
        setIsShowUpdateRegionModal(false);
    };

    const handleDeleteRegion = async (id) => {
        const isSuccess = await deleteRegion(id, currentCompanyId);

        isSuccess ? notification('success', 'success') : notification('warning', 'warning');
    };

    const handleEditRegionClick = (id) => {
        setIsShowUpdateRegionModal(true);
        setCurrentRegionId(id);
    };

    const handleRegionClick = (id) => {
        const url = `/dashboard/${currentCompanyId}/${id}`;

        setCurrentFieldId(null);
        setCurrentRegionId(id);
        goTo(url);
    };

    return (
        <RegionsListComponent
            regionsIds={regionsIds}
            regionsById={regionsById}
            currentRegionId={currentRegionId}
            currentCompanyId={currentCompanyId}
            createRegion={createRegion}
            isShowCreateRegionModal={isShowCreateRegionModal}
            isShowUpdateRegionModal={isShowUpdateRegionModal}
            onOpenCreateRegionModal={handleOpenCreateRegionModal}
            onSubmitCreateRegionModal={handleSubmitCreateRegionModal}
            onUpdateRegionModal={handleUpdateRegionModal}
            onDeleteRegion={handleDeleteRegion}
            onEditRegionClick={handleEditRegionClick}
            onRegionClick={handleRegionClick}
            onCancel={handleCancel}
        />
    );
};

RegionsListContainer.propTypes = propTypes;

RegionsListContainer.displayName = 'RegionsListContainer';

const mapDispatchToProps = {
    createRegion: createRegionAction,
    getRegions: getRegionsAction,
    deleteRegion: deleteRegionAction,
    updateRegion: updateRegionAction,
    setCurrentRegionId: setCurrentRegionIdAction,
    setCurrentFieldId: setCurrentFieldIdAction,
    goTo: push
};

const mapStateToProps = (state) => {
    const { regionsById, regionsIds, currentRegionId } = getRegionsSelector(state);
    return {
        company: getCurrentCompanySelector(state),
        regionsById,
        regionsIds,
        currentRegionId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionsListContainer);
