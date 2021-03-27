import React, { useEffect, useState } from 'react';
import { func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Components */
import FieldsListComponent from './FieldsListComponent';

/* @Actions */
import {
    createFieldAction,
    getFieldsAction,
    setCurrentFieldIdAction,
    deleteFieldAction,
    updateFieldAction
} from '../../store/field/actions';

/* @Selectors */
import { getFieldsSelector } from '../../store/field/selectors';
import { getRegionsSelector } from '../../store/region/selectors';
import { getCurrentCompanyIdSelector } from '../../store/company/selectors';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
    createField: func,
    getFields: func,
    setCurrentFieldId: func,
    deleteField: func,
    updateField: func,
    goTo: func,
    currentCompanyId: number,
    currentRegionId: number,
    currentFieldId: number,
    fieldsById: object,
    fieldsIds: object
};

const FieldsListContainer = ({
    createField,
    getFields,
    setCurrentFieldId,
    deleteField,
    updateField,
    goTo,
    currentCompanyId,
    currentRegionId,
    currentFieldId,
    fieldsById,
    fieldsIds
}) => {
    useEffect(() => {
        if (!!currentRegionId && !fieldsIds[currentRegionId]) {
            getFields(currentRegionId);
        }
    }, [currentRegionId]);

    const [isShowCreateFieldModal, setIsShowCreateFieldModal] = useState(false);
    const [isShowUpdateFieldModal, setIsShowUpdateFieldModal] = useState(false);

    const handleOpenCreateFieldModal = () => {
        setIsShowCreateFieldModal(true);
    };

    const handleOpenUpdateFieldModal = (id) => {
        setCurrentFieldId(id);
        setIsShowUpdateFieldModal(true);
    };

    const handleCancelModal = () => {
        setIsShowCreateFieldModal(false);
        setIsShowUpdateFieldModal(false);
    };

    const handleSubmitCreateFieldModal = async (values) => {
        const { message, isSuccess } = await createField({ ...values, regionId: currentRegionId });

        if (isSuccess) {
            notification('success', message);
            setIsShowCreateFieldModal(false);
            return;
        }

        notification('warning', message);
    };

    const handleUpdateField = async (values) => {
        if (!currentRegionId) {
            notification('error', 'error');
            return;
        }

        const { message, isSuccess } = await updateField({
            ...values,
            fieldId: currentFieldId,
            regionId: currentRegionId
        });

        if (isSuccess) {
            notification('success', message);
            setIsShowUpdateFieldModal(false);
            return;
        }

        notification('warning', message);
    };

    const handleFieldClick = (id) => {
        const url = `/dashboard/${currentCompanyId}/${currentRegionId}/${id}`;

        setCurrentFieldId(id);
        goTo(url);
    };

    const handleDeleteField = async (id) => {
        const isSuccess = await deleteField(id, currentRegionId);

        isSuccess ? notification('success', 'success') : notification('warning', 'warning');
    };

    return (
        <FieldsListComponent
            regionId={currentRegionId}
            fieldsById={fieldsById}
            fieldsIds={fieldsIds}
            currentFieldId={currentFieldId}
            isShowCreateFieldModal={isShowCreateFieldModal}
            isShowUpdateFieldModal={isShowUpdateFieldModal}
            onSubmitCreateFieldModal={handleSubmitCreateFieldModal}
            onCancelModal={handleCancelModal}
            onOpenCreateFieldModal={handleOpenCreateFieldModal}
            onFieldClick={handleFieldClick}
            onDeleteField={handleDeleteField}
            onUpdateField={handleUpdateField}
            onOpenUpdateFieldModal={handleOpenUpdateFieldModal}
        />
    );
};

FieldsListContainer.propTypes = propTypes;

FieldsListContainer.displayName = 'FieldsListContainer';

const mapDispatchToProps = {
    createField: createFieldAction,
    getFields: getFieldsAction,
    setCurrentFieldId: setCurrentFieldIdAction,
    deleteField: deleteFieldAction,
    updateField: updateFieldAction,
    goTo: push
};

const mapStateToProps = (state) => {
    const { currentRegionId } = getRegionsSelector(state);
    const { fieldsById, fieldsIds, currentFieldId } = getFieldsSelector(state);

    return {
        currentCompanyId: getCurrentCompanyIdSelector(state),
        currentRegionId,
        fieldsById,
        fieldsIds,
        currentFieldId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsListContainer);
