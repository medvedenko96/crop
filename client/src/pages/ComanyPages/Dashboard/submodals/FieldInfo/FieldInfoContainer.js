import React, { useEffect } from 'react';
import { shape, string, number, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Actions */
import { getNormBotAction, getZonalManagementAction } from 'store/year/actions';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	currentYear: shape({
		crop: string,
	}),
	currentYearId: number,
	getNormBot: func,
	getZonalManagement: func,
	years: object,
};

const FieldInfoContainer = ({
	currentYear,
	currentYearId,
	getNormBot,
	getZonalManagement,
	years,
}) => {
	const intl = useIntl();

	useEffect(() => {
		if (currentYearId && !years[currentYearId]?.normBot) {
			getNormBot(currentYearId);
		}

		if (currentYearId && !years[currentYearId]?.zonalManagement) {
			getZonalManagement(currentYearId);
		}
	}, [currentYearId]);

	return <FieldInfoComponent intl={intl} currentYear={currentYear} />;
};

FieldInfoContainer.defaultProps = {};
FieldInfoContainer.propTypes = propTypes;
FieldInfoContainer.displayName = 'FieldInfoContainer';

const mapStateToProps = (state, { currentYearId }) => {
	const { yearsById } = getYearsSelector(state);

	return {
		currentYear: yearsById[currentYearId],
		years: yearsById,
	};
};

const mapDispatchToProps = {
	getNormBot: getNormBotAction,
	getZonalManagement: getZonalManagementAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);
