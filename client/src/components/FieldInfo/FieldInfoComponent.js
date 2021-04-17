import React from 'react';
import { number, shape, string, object, func } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';

/* @Styles */
import styles from './FieldInfo.module.css';

const propTypes = {
	intl: object,
	updateZonalManagement: func,
	currentField: shape({
		id: number,
		year: number,
		crop: string,
		zonalManagement: object,
	}),
};

const FieldInfoComponent = ({ intl, updateZonalManagement, currentField }) => {
	return (
		<div>
			<div className={styles.cropTitle}>
				{intl.formatMessage(
					{ id: 'crop' },
					{ crop: currentField.crop?.toLocaleLowerCase() }
				)}
			</div>
			<ZonalManagementTable
				intl={intl}
				initialData={currentField.zonalManagement}
				updateZonalManagement={updateZonalManagement}
			/>
		</div>
	);
};

FieldInfoComponent.propTypes = propTypes;

FieldInfoComponent.displayName = 'FieldInfoContainer';

FieldInfoComponent.defaultProps = {
	currentField: {
		crop: '',
		zonalManagement: [],
	},
};

export default FieldInfoComponent;
