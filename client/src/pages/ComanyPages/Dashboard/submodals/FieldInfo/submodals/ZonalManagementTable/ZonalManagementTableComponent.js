import React from 'react';
import { object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { useIntl } from 'react-intl';

/* @Antd */
import { Table } from 'antd';

/* @Utils */
import { getTableStaff } from './utils';

/* @Styles */
import styles from './ZonalManagementTable.module.css';

const propTypes = {
	zonalManagement: object,
};

const ZonalManagementTableComponent = ({ zonalManagement }) => {
	if (isEmpty(zonalManagement)) {
		return null;
	}

	const intl = useIntl();
	const { rows, columns } = getTableStaff({
		intl,
		initialData: zonalManagement,
	});

	return (
		<div className={styles.wrapper}>
			<Table
				columns={columns}
				bordered
				dataSource={rows}
				rowClassName="editable-row"
				size="small"
				pagination={false}
			/>
		</div>
	);
};

ZonalManagementTableComponent.propTypes = propTypes;
ZonalManagementTableComponent.displayName = 'ZonalManagementTableComponent';

export default ZonalManagementTableComponent;
