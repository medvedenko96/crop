import React, { useState, useEffect } from 'react';
import { func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { push } from 'connected-react-router';
import parseInt from 'lodash/parseInt';

/* @Antd */
import { message as antdMessage, Modal } from 'antd';

/* @Components */
import FieldPageComponent from './FieldPageComponent';

/* @Icons */
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';

/* @Actions */
import {
	createYearAction,
	getYearsAction,
	setCurrentYearIdAction,
	deleteYearAction,
} from 'store/year/actions';
import { setCurrentFieldIdAction, getFieldsAction } from 'store/field/actions';
import { setCurrentRegionIdAction } from 'store/region/actions';

/* @Selectors */
import { getRegionsSelector } from 'store/region/selectors';
import { getFieldsSelector } from 'store/field/selectors';
import { getYearsSelector } from 'store/year/selectors';
import { getCurrentCompanyIdSelector } from 'store/company/selectors';

/* @Utils */
import { yearsFormat } from 'utils/mappers';

const notification = (type, message) => antdMessage[type](message);

const { confirm } = Modal;
const confirmDeleteYear = (onRemove, intl) =>
	confirm({
		icon: <ExclamationCircleOutlined />,
		content: intl.formatMessage({ id: 'year.deleteConfirmTitle' }),
		okText: intl.formatMessage({ id: 'confirm.yes' }),
		cancelText: intl.formatMessage({ id: 'confirm.no' }),
		onOk() {
			onRemove();
		},
	});

const propTypes = {
	createYear: func,
	getYears: func,
	setCurrentYearId: func,
	setCurrentFieldId: func,
	deleteYear: func,
	getFields: func,
	setCurrentRegionId: func,
	goTo: func,
	yearsById: object,
	yearsIds: object,
	fieldsIds: object,
	currentCompanyId: number,
	currentYearId: number,
	currentRegionId: number,
	currentFieldId: number,
};

const FieldPageContainer = ({
	createYear,
	getYears,
	setCurrentYearId,
	setCurrentFieldId,
	deleteYear,
	getFields,
	setCurrentRegionId,
	goTo,
	yearsById,
	yearsIds,
	fieldsIds,
	currentCompanyId,
	currentYearId,
	currentRegionId,
	currentFieldId,
}) => {
	const { regionId, fieldId, yearId } = useParams();

	useEffect(() => {
		currentRegionId || setCurrentRegionId(parseInt(regionId));
		currentYearId || setCurrentYearId(parseInt(yearId));
		currentFieldId || setCurrentFieldId(parseInt(fieldId));

		if (currentFieldId && !fieldsIds[currentFieldId]) {
			getFields(parseInt(regionId));
		}

		getYears(parseInt(fieldId));
	}, []);

	const intl = useIntl();
	const [isShowCreateYearModal, setIsShowCreateYearModal] = useState(false);

	const years = yearsFormat(yearsById, yearsIds, currentFieldId);
	const activeYear = currentYearId
		? currentYearId?.toString()
		: yearsIds[currentFieldId] && yearsIds[currentFieldId][0]?.toString();

	const handleBackClick = () => {
		const url = currentCompanyId
			? `/dashboard/${currentCompanyId}/${currentRegionId}/${currentFieldId}`
			: '/dashboard';

		goTo(url);
	};

	const handleCancel = () => setIsShowCreateYearModal(false);

	const handleSubmitCreateYearModal = async (values) => {
		const { message, isSuccess } = await createYear({ ...values, fieldId: currentFieldId });

		if (isSuccess) {
			notification('success', intl.formatMessage({ id: message }));
			setIsShowCreateYearModal(false);
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const handleRemoveYear = (id) => async () => {
		const { isSuccess, message } = await deleteYear(id, currentFieldId);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	const handleTabClick = (activeKey) => {
		const url = `/field/${currentRegionId}/${currentFieldId}/${activeKey}`;

		setCurrentYearId(parseInt(activeKey));
		goTo(url);
	};

	const handleActionsOnTab = (targetKey, action) => {
		if (action === 'add') {
			setIsShowCreateYearModal(true);
		}

		if (action === 'remove') {
			confirmDeleteYear(handleRemoveYear(parseInt(targetKey)), intl);
		}
	};

	return (
		<FieldPageComponent
			intl={intl}
			isShowCreateYearModal={isShowCreateYearModal}
			yearsIds={yearsIds}
			currentYearId={currentYearId}
			currentFieldId={currentFieldId}
			activeYear={activeYear}
			years={years}
			onCancel={handleCancel}
			onActionsOnTab={handleActionsOnTab}
			onSubmitCreateYearModal={handleSubmitCreateYearModal}
			onTabClick={handleTabClick}
			onBackClick={handleBackClick}
		/>
	);
};

FieldPageContainer.propTypes = propTypes;

FieldPageContainer.defaultProps = {};

FieldPageContainer.displayName = 'FieldPageContainer';

const mapStateToProps = (state) => {
	const { currentFieldId, fieldsIds } = getFieldsSelector(state);
	const { yearsById, yearsIds, currentYearId } = getYearsSelector(state);
	const { currentRegionId } = getRegionsSelector(state);

	return {
		currentCompanyId: getCurrentCompanyIdSelector(state),
		currentFieldId,
		currentYearId,
		currentRegionId,
		yearsById,
		yearsIds,
		fieldsIds,
	};
};

const mapDispatchToProps = {
	setCurrentYearId: setCurrentYearIdAction,
	setCurrentFieldId: setCurrentFieldIdAction,
	setCurrentRegionId: setCurrentRegionIdAction,
	createYear: createYearAction,
	getYears: getYearsAction,
	getFields: getFieldsAction,
	deleteYear: deleteYearAction,
	goTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldPageContainer);
