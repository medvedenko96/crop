import React from 'react';
import { number, shape, string, object } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';

/* @Styles */
import styles from './FieldInfo.module.css';

const propTypes = {
	intl: object,
	currentField: shape({
		id: number,
		year: number,
		crop: string,
	}),
};

const FieldInfoComponent = ({ intl, currentField }) => {
	return (
		<div>
			<div className={styles.cropTitle}>
				{intl.formatMessage(
					{ id: 'crop' },
					{ crop: currentField.crop?.toLocaleLowerCase() }
				)}
			</div>
			<ZonalManagementTable />
		</div>
	);
};

FieldInfoComponent.propTypes = propTypes;

FieldInfoComponent.displayName = 'FieldInfoContainer';

FieldInfoComponent.defaultProps = {
	currentField: {
		crop: '',
	},
};

export default FieldInfoComponent;
