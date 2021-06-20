import React, { useState, useEffect } from 'react';
import { func, number, object, shape, string } from 'prop-types';
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
	getZonalManagementAction,
	getNormBotAction,
} from 'store/year/actions';
import { setCurrentFieldIdAction, getFieldsAction } from 'store/field/actions';
import { setCurrentRegionIdAction, getRegionAction } from 'store/region/actions';
import { setCurrentCompanyIdAction, getCompanyAction } from 'store/company/actions';

/* @Selectors */
import { getRegionsSelector } from 'store/region/selectors';
import { getFieldsSelector } from 'store/field/selectors';
import { getYearsSelector } from 'store/year/selectors';
import { getCurrentCompanyIdSelector, getCurrentCompanySelector } from 'store/company/selectors';

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
	setCurrentCompanyId: func,
	deleteYear: func,
	getFields: func,
	getRegion: func,
	getCompany: func,
	setCurrentRegionId: func,
	getZonalManagement: func,
	getNormBot: func,
	goTo: func,
	yearsById: object,
	yearsIds: object,
	fieldsIds: object,
	currentRegion: shape({ name: string }),
	currentCompany: shape({ name: string }),
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
	setCurrentCompanyId,
	deleteYear,
	getFields,
	getRegion,
	getCompany,
	setCurrentRegionId,
	getZonalManagement,
	getNormBot,
	goTo,
	yearsById,
	yearsIds,
	fieldsIds,
	currentRegion,
	currentCompany,
	currentCompanyId,
	currentYearId,
	currentRegionId,
	currentFieldId,
}) => {
	const { companyId, regionId, fieldId, yearId } = useParams();

	useEffect(() => {
		currentCompanyId || setCurrentCompanyId(parseInt(companyId));
		currentRegionId || setCurrentRegionId(parseInt(regionId));
		currentFieldId || setCurrentFieldId(parseInt(fieldId));
		currentYearId || setCurrentYearId(parseInt(yearId));

		if (yearId) {
			getZonalManagement(parseInt(yearId));
			getNormBot(parseInt(yearId));
		}

		if (currentFieldId && !fieldsIds[currentFieldId]) {
			getFields(parseInt(regionId));
		}

		getCompany(parseInt(companyId));
		getRegion(parseInt(regionId));
		getYears(parseInt(fieldId));
	}, []);

	const intl = useIntl();
	const [isShowCreateYearModal, setIsShowCreateYearModal] = useState(false);
	const [isShowDrawer, setIsShowDrawer] = useState(false);
	const years = yearsFormat(yearsById, yearsIds, currentFieldId);

	const handleShowDrawer = () => setIsShowDrawer(true);
	const handleCloseDrawer = () => setIsShowDrawer(false);

	const handleBackClick = () => {
		const url = `/dashboard/${currentCompanyId}/${currentRegionId}/${currentFieldId}`;

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

	const handleTabClick = async (activeKey) => {
		const url = `/field/${currentCompanyId}/${currentRegionId}/${currentFieldId}/${activeKey}`;

		await setCurrentYearId(parseInt(activeKey));

		if (!yearsById[activeKey].zonalManagement) {
			await getZonalManagement(parseInt(activeKey));
		}

		if (!yearsById[activeKey].normBot) {
			await getNormBot(parseInt(activeKey));
		}

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
			activeYear={yearId}
			years={years}
			currentRegion={currentRegion}
			currentCompany={currentCompany}
			isShowDrawer={isShowDrawer}
			onShowDrawer={handleShowDrawer}
			onCloseDrawer={handleCloseDrawer}
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
	const { currentRegionId, regionsById } = getRegionsSelector(state);

	return {
		currentCompanyId: getCurrentCompanyIdSelector(state),
		currentCompany: getCurrentCompanySelector(state),
		currentRegion: regionsById[currentRegionId],
		currentFieldId,
		currentYearId,
		currentRegionId,
		yearsById,
		yearsIds,
		fieldsIds,
	};
};

const mapDispatchToProps = {
	setCurrentCompanyId: setCurrentCompanyIdAction,
	setCurrentYearId: setCurrentYearIdAction,
	setCurrentFieldId: setCurrentFieldIdAction,
	setCurrentRegionId: setCurrentRegionIdAction,
	createYear: createYearAction,
	getYears: getYearsAction,
	getFields: getFieldsAction,
	getRegion: getRegionAction,
	getCompany: getCompanyAction,
	deleteYear: deleteYearAction,
	getZonalManagement: getZonalManagementAction,
	getNormBot: getNormBotAction,
	goTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldPageContainer);
