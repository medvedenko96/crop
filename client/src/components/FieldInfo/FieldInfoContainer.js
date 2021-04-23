import React from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	currentField: shape({ crop: string }),
};

const FieldInfoContainer = ({ currentField }) => {
	const intl = useIntl();

	return <FieldInfoComponent intl={intl} currentField={currentField} />;
};

FieldInfoContainer.propTypes = propTypes;

FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
	const { yearsById, currentYearId } = getYearsSelector(state);

	return { currentField: yearsById[currentYearId] };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);
