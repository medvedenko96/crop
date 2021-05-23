import React from 'react';
import { connect } from 'react-redux';

/* @Pages */
import DashboardComponent from './DashboardComponent';

const propTypes = {};

const DashboardContainer = () => {
	return <DashboardComponent />;
};

DashboardContainer.propTypes = propTypes;

DashboardContainer.displayName = 'DashboardContainer';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
