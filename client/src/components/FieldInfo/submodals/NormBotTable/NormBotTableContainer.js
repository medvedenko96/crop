import React, { useState, useEffect } from 'react';
import { array, func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import classNames from 'classnames/bind';

/* @Components */
import NormBotTableComponent from './NormBotTableComponent';

/* @Antd */
import { Form, message as antdMessage } from 'antd';

/* @Actions */
import { setNormBotAction, deleteNormBotRowAction } from 'store/year/actions';

/* @Selectors */
import { getNormBot } from 'store/year/selectors';

/* @Utils */
import { getTableStaff, addDefaultRow, initialDataMapper } from './utils';

/* @Styles */
import styles from './NormBotTable.module.css';

const cx = classNames.bind(styles);

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
	setNormBot: func,
	deleteNormBotRow: func,
	normBot: array,
};

const NormBotTableContainer = ({ setNormBot, deleteNormBotRow, normBot }) => {
	const intl = useIntl();
	const [tableData, setTableData] = useState(initialDataMapper(normBot));

	useEffect(() => {
		setTableData(initialDataMapper(normBot));
	}, [normBot]);

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
		const { isSuccess, message } = await setNormBot({ ...values, rowKey: key });

		if (isSuccess) {
			setEditingKey('');
			notification('success', intl.formatMessage({ id: message }));
			return;
		}

		notification('warning', intl.formatMessage({ id: message }));
	};

	const handleAddRowClick = () => {
		const newRow = addDefaultRow(tableData.length);

		setTableData([...tableData, newRow]);
		form.setFieldsValue(newRow);
		setEditingKey(newRow.key);
	};

	const onDelete = async ({ rowKey }) => {
		const { isSuccess, message } = await deleteNormBotRow(rowKey);

		isSuccess
			? notification('success', intl.formatMessage({ id: message }))
			: notification('warning', intl.formatMessage({ id: message }));
	};

	const { mergedColumns } = getTableStaff({
		cx,
		intl,
		editingKey,
		isEditing,
		onEdit,
		onDelete,
		onCancel,
		onSave,
		Item: Form.Item,
	});

	return (
		<NormBotTableComponent
			intl={intl}
			editingKey={editingKey}
			onAddRowClick={handleAddRowClick}
			form={form}
			mergedColumns={mergedColumns}
			tableData={tableData}
		/>
	);
};

NormBotTableContainer.defaultProps = {
	normBot: [],
};

NormBotTableContainer.propTypes = propTypes;

NormBotTableContainer.displayName = 'NormBotTableContainer';

const mapDispatchToProps = {
	setNormBot: setNormBotAction,
	deleteNormBotRow: deleteNormBotRowAction,
};

const mapStateToProps = (state) => {
	return { normBot: getNormBot(state) };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormBotTableContainer);
