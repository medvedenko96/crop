import React from 'react';
import { shape, string, object } from 'prop-types';

/* @Components */
import ZonalManagementTable from './submodals/ZonalManagementTable';
import NormBotTable from './submodals/NormBotTable';

/* @Utils */
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

/* @Styles */
import styles from './FieldInfo.module.css';

const propTypes = {
	intl: object,
	currentField: shape({ crop: string }),
};

const FieldInfoComponent = ({ intl, currentField }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.cropTitle}>
				{intl.formatMessage(
					{ id: 'crop' },
					{ crop: capitalizeFirstLetter(currentField.crop) }
				)}
			</div>
			<ZonalManagementTable />
			<NormBotTable />
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
