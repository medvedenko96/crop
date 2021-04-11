import React from 'react';
import { bool, string, node } from 'prop-types';

import { InputNumber } from 'antd';

const propTypes = {
	editing: bool,
	children: node,
	dataIndex: string,
	Item: node,
};

const EditableCell = ({ editing, children, dataIndex, Item }) => {
	return (
		<td>
			{editing ? (
				<Item name={dataIndex} style={{ margin: 0 }}>
					<InputNumber size="small" />
				</Item>
			) : (
				children
			)}
		</td>
	);
};

EditableCell.propTypes = propTypes;

EditableCell.displayName = 'EditableCell';

EditableCell.defaultProps = {};

export default EditableCell;
