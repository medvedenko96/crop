import React from 'react';
import { array, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { push } from 'connected-react-router';

/* @Components */
import TabsComponent from './TabsComponent';

/* @Actions */
import { setCurrentYearIdAction } from 'store/year/actions';

/* @Selectors */
import { getFieldsSelector } from 'store/field/selectors';
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	currentFieldId: number,
	currentYearId: number,
	currentYears: array,
	setCurrentYearId: func,
	goTo: func,
};

const TabsContainer = ({ currentFieldId, currentYearId, currentYears, setCurrentYearId, goTo }) => {
	const intl = useIntl();
	const currentYear = currentYearId || currentYears[0]?.id;

	const handleTabClick = (key) => {
		setCurrentYearId(parseInt(key));
		goTo(`/${currentFieldId}/${key}`);
	};

	return (
		<TabsComponent
			intl={intl}
			currentYearId={currentYear}
			currentYears={currentYears}
			onTabClick={handleTabClick}
		/>
	);
};

TabsContainer.defaultProps = {
	currentYears: [],
};
TabsContainer.propTypes = propTypes;
TabsContainer.displayName = 'TabsContainer';

const mapStateToProps = (state) => {
	const { currentFieldId } = getFieldsSelector(state);
	const { yearsById, yearsIds, currentYearId } = getYearsSelector(state);

	return {
		currentFieldId,
		currentYearId,
		currentYears: yearsIds[currentFieldId]?.map((yearId) => yearsById[yearId]),
	};
};

const mapDispatchToProps = {
	setCurrentYearId: setCurrentYearIdAction,
	goTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
