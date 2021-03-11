import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

/* @Actions */
import { createRegionAction } from '../../store/actions/region';

/* @Selectors */
import { getCurrentCompany } from '../../store/selectors/company';

const propTypes = {
  createRegion: func,
};

const DashboardContentContainer = ({ createRegion }) => {
  const { companyId } = useParams();

  return <DashboardContentComponent companyId={companyId} createRegion={createRegion} />;
};

DashboardContentComponent.propTypes = propTypes;

const actions = {
  createRegion: createRegionAction,
};

const props = (state) => {
  return {
    company: getCurrentCompany(state),
  };
};

export default connect(props, actions)(DashboardContentContainer);
