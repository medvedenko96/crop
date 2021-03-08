import React from 'react';
import { connect } from 'react-redux';

/* @Components */
import DashboardPage from './DashboardPage';

const propTypes = {};

const DashboardContainer = () => {
  return <DashboardPage />;
};

DashboardContainer.propTypes = propTypes;

DashboardContainer.defaultProps = {};

export default connect(null, null)(DashboardContainer);
