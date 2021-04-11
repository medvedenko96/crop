import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames/bind';

/* @Antd */
import { Form, Table } from 'antd';

/* @Components */
import EditableCell from './EditableCellComponent';

/* @Utils */
import { getTableStaff } from './utils';

/* @Styles */
import styles from './ZonalManagementTable.module.css';

const cx = classNames.bind(styles);

const propTypes = {};

const ZonalManagementTableComponent = () => {
	const intl = useIntl();
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

	const onSave = (key) => {
		console.log(key);
	};

	const { rows, mergedColumns } = getTableStaff({
		cx,
		intl,
		styles,
		editingKey,
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
