import React, { useEffect } from 'react';
import { func, number, array } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

/* @Components */
import MenuComponent from './MenuComponent';

/* @Actions */
import { getRegionsWithFieldsAction } from 'store/region/actions';
import { setCurrentFieldIdAction } from 'store/field/actions';

/* @Selectors */
import { getRegionsSelector } from 'store/region/selectors';

const propTypes = {
	getRegionsWithFields: func,
	setCurrentFieldId: func,
	goTo: func,
	companyId: number,
	regions: array,
};

const MenuContainer = ({ getRegionsWithFields, setCurrentFieldId, goTo, companyId, regions }) => {
	const { fieldId } = useParams();

	useEffect(() => getRegionsWithFields(companyId), []);

	const handleClick = async ({ key: fieldId }) => {
		setCurrentFieldId(fieldId);
		goTo(fieldId);
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
	setCurrentFieldId: setCurrentFieldIdAction,
	goTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
