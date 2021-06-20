import React from 'react';
import { shape, string, object } from 'prop-types';

/* @Components */
import NormBotSlider from './submodals/NormBotSlider';
import ZonalManagementTable from './submodals/ZonalManagementTable';

/* @Utils */
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

/* @Styles */
import styles from './FieldInfo.module.css';

const propTypes = {
	intl: object,
	currentYear: shape({
		crop: string,
		normBot: object,
	}),
};

const FieldInfoComponent = ({ intl, currentYear }) => {
	return (
		<div>
			<div className={styles.cropTitle}>
				{intl.formatMessage(
					{ id: 'crop' },
					{ crop: capitalizeFirstLetter(currentYear?.crop) }
				)}
			</div>
			<NormBotSlider normBot={currentYear?.normBot} />
			<ZonalManagementTable zonalManagement={currentYear?.zonalManagement} />
		</div>
	);
};

FieldInfoComponent.defaultProps = {
	currentYear: {
		crop: '',
		normBot: {},
	},
};
FieldInfoComponent.propTypes = propTypes;
FieldInfoComponent.displayName = 'FieldInfoComponent';

export default FieldInfoComponent;
