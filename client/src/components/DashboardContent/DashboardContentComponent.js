import React from 'react';
import { string } from 'prop-types';

const propTypes = {
  company: string,
};

const DashboardContentContainer = ({ company }) => {
  return <div>{`company name: ${company}`}</div>;
};

DashboardContentContainer.propTypes = propTypes;

export default DashboardContentContainer;
