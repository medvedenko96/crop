import React, { useEffect } from 'react';
import { func, number, array, object } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getRegionsWithFieldsAction } from 'store/region/actions';
import { setCurrentFieldIdAction } from 'store/field/actions';
import { setCurrentYearIdAction, getYearsAction } from 'store/year/actions';

/* @Selectors */
import { getRegionsSelector } from 'store/region/selectors';
import { getYearsSelector } from 'store/year/selectors';

const propTypes = {
	getRegionsWithFields: func,
	setCurrentFieldId: func,
	setCurrentYearId: func,
	getYears: func,
	goTo: func,
	companyId: number,
	regions: array,
	yearsIds: object,
};

const MenuContainer = ({
	getRegionsWithFields,
	setCurrentFieldId,
	setCurrentYearId,
	getYears,
	goTo,
	companyId,
	regions,
	yearsIds,
}) => {
	const { fieldId } = useParams();

	useEffect(() => {
		getRegionsWithFields(companyId);

		if (fieldId) {
			setCurrentFieldId(parseInt(fieldId));
			getYears(fieldId);
		}
	}, []);

	const handleClick = ({ key: fieldId }) => {
		yearsIds[parseInt(fieldId)] || getYears(parseInt(fieldId));
		setCurrentFieldId(parseInt(fieldId));
		setCurrentYearId(null);
		goTo(`/${fieldId}`);
	};

	return (
		<MenuComponent
			regions={regions}
			onClick={handleClick}
			selectedKeys={[fieldId?.toString()]}
		/>
	);
};

MenuContainer.defaultProps = {
	regions: [],
};

MenuContainer.propTypes = propTypes;

MenuContainer.displayName = 'MenuContainer';

const mapStateToProps = (state) => {
	const { user } = state;
	const { regionsById, regionsIds } = getRegionsSelector(state);
	const { yearsIds } = getYearsSelector(state);

	const regions = regionsIds[user.id]?.map((id) => {
		return { ...regionsById[id] };
	});

	return {
		companyId: user.id,
		yearsIds,
		regions,
	};
};

const mapDispatchToProps = {
	getRegionsWithFields: getRegionsWithFieldsAction,
	setCurrentFieldId: setCurrentFieldIdAction,
	setCurrentYearId: setCurrentYearIdAction,
	getYears: getYearsAction,
	goTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
