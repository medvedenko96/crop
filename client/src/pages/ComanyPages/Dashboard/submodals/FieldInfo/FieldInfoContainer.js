import React, { useEffect } from 'react';
import { shape, string, number, func, object, array } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Components */
import FieldInfoComponent from './FieldInfoComponent';

/* @Actions */
import { getNormBotAction, getZonalManagementAction, getFilesAction } from 'store/year/actions';

/* @Selectors */
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	currentYear: shape({
		crop: string,
		normBot: object,
		description: string,
		imgYield: string,
		imgControlArea: string,
		files: array,
	}),
	currentYearId: number,
	getNormBot: func,
	getZonalManagement: func,
	years: object,
	getFiles: func,
};

const FieldInfoContainer = ({
	currentYear,
	currentYearId,
	getNormBot,
	getZonalManagement,
	years,
	getFiles,
}) => {
	const intl = useIntl();

	useEffect(() => {
		if (currentYearId && !years[currentYearId]?.normBot) {
			getNormBot(currentYearId);
		}

		if (currentYearId && !years[currentYearId]?.zonalManagement) {
			getZonalManagement(currentYearId);
		}

		if (currentYearId && !years[currentYearId]?.files) {
			getFiles(currentYearId);
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
	getFiles: getFilesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldInfoContainer);
