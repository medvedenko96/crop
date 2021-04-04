import React, { useEffect } from 'react';
import { shape, number, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

/* @Actions */
import { setCurrentFieldIdAction } from 'store/field/actions';
import { setCurrentRegionIdAction } from 'store/region/actions';

/* @Selectors */
import { getCurrentCompanySelector } from 'store/company/selectors';

const propTypes = {
	company: shape({
		id: number,
		name: string,
	}),
	setCurrentRegionId: func,
	setCurrentFieldId: func,
};

const DashboardContentContainer = ({ company, setCurrentRegionId, setCurrentFieldId }) => {
	const { companyId, regionId, fieldId } = useParams();

	useEffect(() => {
		setCurrentRegionId(parseInt(regionId));
		setCurrentFieldId(parseInt(fieldId));
	}, [companyId, regionId, fieldId]);

	return <DashboardContentComponent company={company} />;
};

DashboardContentContainer.propTypes = propTypes;

DashboardContentContainer.displayName = 'DashboardContentContainer';

const mapDispatchToProps = {
	setCurrentRegionId: setCurrentRegionIdAction,
	setCurrentFieldId: setCurrentFieldIdAction,
};

const mapStateToProps = (state) => {
	return {
		company: getCurrentCompanySelector(state),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContentContainer);
