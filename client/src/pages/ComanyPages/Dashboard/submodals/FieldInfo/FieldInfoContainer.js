import React from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	currentYear: shape({
		crop: string,
	}),
};

const FieldInfoContainer = ({ currentYear }) => {
	const intl = useIntl();

	return <FieldInfoComponent intl={intl} currentYear={currentYear} />;
};

FieldInfoContainer.defaultProps = {};
FieldInfoContainer.propTypes = propTypes;
FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapStateToProps = (state, { currentYearId }) => {
	const { yearsById } = getYearsSelector(state);

	return {
		currentYear: yearsById[currentYearId],
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);
