import React from 'react';
import { number } from 'prop-types';

const propTypes = {
  companyId: number,
};

const DashboardContentContainer = ({ companyId }) => {
  return <div>{`company id: ${companyId}`}</div>;
};

DashboardContentContainer.propTypes = propTypes;

export default DashboardContentContainer;
