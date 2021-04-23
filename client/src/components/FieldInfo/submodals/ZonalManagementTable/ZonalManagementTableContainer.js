import React, { useState } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Antd */
import { Form, message as antdMessage } from 'antd';

/* @Components */
import ZonalManagementTableComponent from './ZonalManagementTableComponent';

/* @Utils */
import { getTableStaff } from './utils';

/* @Actions */
import { updateZonalManagementAction } from 'store/year/actions';

/* @selectors */
import { getZonalManagement } from 'store/year/selectors';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
	updateZonalManagement: func,
	zonalManagement: object,
};

const ZonalManagementTableContainer = ({ updateZonalManagement, zonalManagement }) => {
	const intl = useIntl();
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();

	const isEditing = (record) => record.key === editingKey;

	const onEdit = (record) => {
		form.setFieldsValue(record);
		setEditingKey(record.key);
	};

	const onCancel = () => setEditingKey('');

	const onSave = async (key) => {
		const values = await form.validateFields();
		const { isSuccess, message } = await updateZonalManagement(key, values);

		if (isSuccess) {
			setEditingKey('');
			notification('success', intl.formatMessage({ id: message }));
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const { rows, mergedColumns } = getTableStaff({
		intl,
		editingKey,
		initialData: zonalManagement,
		isEditing,
		onEdit,
		onCancel,
		onSave,
		Item: Form.Item,
	});

	return <ZonalManagementTableComponent form={form} mergedColumns={mergedColumns} rows={rows} />;
};

ZonalManagementTableContainer.defaultProps = {
	zonalManagement: {},
};

ZonalManagementTableContainer.propTypes = propTypes;

ZonalManagementTableContainer.displayName = 'ZonalManagementTableContainer';

const mapDispatchToProps = {
	updateZonalManagement: updateZonalManagementAction,
};

const mapStateToProps = (state) => {
	return { zonalManagement: getZonalManagement(state) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZonalManagementTableContainer);
