import React from 'react';
import { bool, string, node, func } from 'prop-types';

import { InputNumber } from 'antd';

const propTypes = {
	editing: bool,
	children: node,
	dataIndex: string,
	Item: func,
};

const EditableCell = ({ editing, children, dataIndex, Item, ...restProps }) => {
	return (
		<td {...restProps}>
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
