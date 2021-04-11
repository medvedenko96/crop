import React from 'react';
import { shape, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';
import { getFieldsSelector } from 'store/field/selectors';

const propTypes = {
	currentField: shape({
		id: number,
		year: number,
		crop: string,
	}),
};

const FieldInfoContainer = ({ currentField }) => {
	const intl = useIntl();

	return <FieldInfoComponent intl={intl} currentField={currentField} />;
};

FieldInfoContainer.propTypes = propTypes;

FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
	const { yearsById, currentYearId, yearsIds } = getYearsSelector(state);
	const { currentFieldId } = getFieldsSelector(state);

	const activeYear = currentYearId
		? currentYearId?.toString()
		: yearsIds[currentFieldId] && yearsIds[currentFieldId][0]?.toString();

	return { currentField: yearsById[activeYear] };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);
