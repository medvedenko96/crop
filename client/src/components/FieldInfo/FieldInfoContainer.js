import React from 'react';
import { shape, number, string, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Actions */
import { updateZonalManagementAction } from 'store/year/actions';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	updateZonalManagement: func,
	currentField: shape({
		id: number,
		year: number,
		crop: string,
		zonalManagement: object,
	}),
};

const FieldInfoContainer = ({ updateZonalManagement, currentField }) => {
	const intl = useIntl();

	return (
		<FieldInfoComponent
			intl={intl}
			updateZonalManagement={updateZonalManagement}
			currentField={currentField}
		/>
	);
};

FieldInfoContainer.propTypes = propTypes;

FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapDispatchToProps = {
	updateZonalManagement: updateZonalManagementAction,
};

const mapStateToProps = (state) => {
	const { yearsById, currentYearId } = getYearsSelector(state);

	return { currentField: yearsById[currentYearId] };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);
