import React from 'react';
import { shape, number, string, array } from 'prop-types';
import { connect } from 'react-redux';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

/* @Selectors */
import { getCurrentCompanySelector } from '../../store/selectors/company';

const propTypes = {
  company: shape({
    id: number,
    name: string,
    regions: array,
  }),
};

const DashboardContentContainer = ({ company }) => {
  return <DashboardContentComponent company={company} />;
};

DashboardContentComponent.propTypes = propTypes;

DashboardContentComponent.displayName = 'DashboardContentComponent';

const mapStateToProps = (state) => {
  return {
    company: getCurrentCompanySelector(state),
  };
};

export default connect(mapStateToProps, null)(DashboardContentContainer);
