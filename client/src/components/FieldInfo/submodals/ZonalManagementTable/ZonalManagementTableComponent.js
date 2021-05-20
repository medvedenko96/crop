import React from 'react';
import { array, object } from 'prop-types';

/* @Antd */
import { Form, Table } from 'antd';

/* @Components */
import EditableCell from '../EditableCell';

const propTypes = {
	form: object,
	mergedColumns: array,
	rows: array,
};

const ZonalManagementTableComponent = ({ form, mergedColumns, rows }) => {
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

ZonalManagementTableComponent.defaultProps = {
	mergedColumns: [],
};

ZonalManagementTableComponent.propTypes = propTypes;

ZonalManagementTableComponent.displayName = 'ZonalManagementTableComponent';

export default ZonalManagementTableComponent;
