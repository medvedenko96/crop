import React from 'react';
import { useParams } from 'react-router-dom';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

const DashboardContentContainer = () => {
  const { company } = useParams();

  return <DashboardContentComponent company={company} />;
};

export default DashboardContentContainer;
