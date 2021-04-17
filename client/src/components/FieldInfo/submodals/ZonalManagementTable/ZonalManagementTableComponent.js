import React, { useState } from 'react';
import { func, object } from 'prop-types';
import classNames from 'classnames/bind';

/* @Antd */
import { Form, message as antdMessage, Table } from 'antd';

/* @Components */
import EditableCell from './EditableCellComponent';

/* @Utils */
import { getTableStaff } from './utils';

/* @Styles */
import styles from './ZonalManagementTable.module.css';

const cx = classNames.bind(styles);

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
	intl: object,
	updateZonalManagement: func,
	initialData: object,
};

const ZonalManagementTableComponent = ({ intl, updateZonalManagement, initialData }) => {
	const [editingKey, setEditingKey] = useState('');
	const [form] = Form.useForm();

	const isEditing = (record) => record.key === editingKey;

	const onEdit = (record) => {
		form.setFieldsValue({
			name: '',
			age: '',
			address: '',
			...record,
		});
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
		cx,
		intl,
		styles,
		editingKey,
		initialData,
		isEditing,
		onEdit,
		onCancel,
		onSave,
		Item: Form.Item,
	});

	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				columns={mergedColumns}
				bordered
				dataSource={rows}
				rowClassName="editable-row"
				size="small"
				pagination={false}
			/>
		</Form>
	);
};

ZonalManagementTableComponent.propTypes = propTypes;

ZonalManagementTableComponent.displayName = 'ZonalManagementTableComponent';

ZonalManagementTableComponent.defaultProps = {};

export default ZonalManagementTableComponent;
