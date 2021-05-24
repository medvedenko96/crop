import React, { useEffect } from 'react';
import { func, number, array } from 'prop-types';
import { connect } from 'react-redux';

/* @Pages */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getRegionsWithFieldsAction, setCurrentRegionIdAction } from 'store/region/actions';

/* @Selectors */
import { getRegionsSelector } from 'store/region/selectors';

const propTypes = {
	getRegionsWithFields: func,
	setCurrentRegionId: func,
	companyId: number,
	regions: array,
};

const MenuContainer = ({ getRegionsWithFields, setCurrentRegionId, companyId, regions }) => {
	useEffect(() => getRegionsWithFields(companyId), []);

	const handleSubMenuClick = async ({ key: regionId }) => {
		setCurrentRegionId(regionId);
	};

	return <MenuComponent regions={regions} onSubMenuClick={handleSubMenuClick} />;
};

MenuContainer.defaultProps = {
	regions: [],
};

MenuContainer.propTypes = propTypes;

MenuContainer.displayName = 'MenuContainer';

const mapStateToProps = (state) => {
	const { user } = state;
	const { regionsById, regionsIds } = getRegionsSelector(state);

	const regions = regionsIds[user.id]?.map((id) => {
		return { ...regionsById[id] };
	});

	return {
		companyId: user.id,
		regions,
	};
};

const mapDispatchToProps = {
	getRegionsWithFields: getRegionsWithFieldsAction,
	setCurrentRegionId: setCurrentRegionIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
