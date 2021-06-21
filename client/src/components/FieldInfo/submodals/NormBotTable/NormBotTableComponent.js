import React from 'react';
import { func, object, array, string } from 'prop-types';

/* @Antd */
import { Form, Table, Button } from 'antd';

/* @Components */
import EditableCell from '../EditableCell';

/* @Styles */
import styles from './NormBotTable.module.css';

const propTypes = {
	intl: object,
	editingKey: string,
	onAddRowClick: func,
	form: object,
	mergedColumns: array,
	tableData: array,
};

const NormBotTable = ({ intl, editingKey, onAddRowClick, form, mergedColumns, tableData }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Button disabled={editingKey} onClick={onAddRowClick}>
					{intl.formatMessage({ id: 'normBot.addRow' })}
				</Button>
			</div>
			<Form form={form} component={false}>
				<Table
					components={{
						body: {
							cell: EditableCell,
						},
					}}
					columns={mergedColumns}
					dataSource={tableData}
					rowClassName="editable-row"
					bordered
					size="small"
					pagination={false}
				/>
			</Form>
		</div>
	);
};

NormBotTable.propTypes = propTypes;

NormBotTable.displayName = 'NormBotTable';

export default NormBotTable;
