import React from 'react';
import { connect } from 'react-redux';

/* @Components */
import DashboardComponent from './DashboardComponent';

const propTypes = {};

const DashboardContainer = () => {
	return <DashboardComponent />;
};

DashboardContainer.propTypes = propTypes;

DashboardContainer.defaultProps = {};

export default connect(null, null)(DashboardContainer);
