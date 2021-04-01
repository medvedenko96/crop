import React, { useEffect, useState } from 'react';
import { func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useIntl } from 'react-intl';

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
	updateFieldAction,
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
	fieldsIds: object,
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
	fieldsIds,
}) => {
	useEffect(() => {
		if (!!currentRegionId && !fieldsIds[currentRegionId]) {
			getFields(currentRegionId);
		}
	}, [currentRegionId]);

	const intl = useIntl();

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
		const { message, isSuccess } = await createField({
			...values,
			regionId: currentRegionId,
		});

		if (isSuccess) {
			notification('success', intl.formatMessage({ id: message }));
			setIsShowCreateFieldModal(false);
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const handleUpdateField = async (values) => {
		const { message, isSuccess } = await updateField({
			...values,
			fieldId: currentFieldId,
			regionId: currentRegionId,
		});

		if (isSuccess) {
			notification('success', intl.formatMessage({ id: message }));
			setIsShowUpdateFieldModal(false);
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const handleFieldClick = (id) => {
		const url = `/dashboard/${currentCompanyId}/${currentRegionId}/${id}`;

		setCurrentFieldId(id);
		goTo(url);
	};

	const handleDeleteField = async (id) => {
		const { isSuccess, message } = await deleteField(id, currentRegionId);

		if (isSuccess) {
			notification('success', intl.formatMessage({ id: message }));
			setCurrentFieldId(null);
			goTo(`/dashboard/${currentCompanyId}/${currentRegionId}`);
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	return (
		<FieldsListComponent
			intl={intl}
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
	goTo: push,
};

const mapStateToProps = (state) => {
	const { currentRegionId } = getRegionsSelector(state);
	const { fieldsById, fieldsIds, currentFieldId } = getFieldsSelector(state);

	return {
		currentCompanyId: getCurrentCompanyIdSelector(state),
		currentRegionId,
		fieldsById,
		fieldsIds,
		currentFieldId,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsListContainer);
