import React, { useState, useEffect } from 'react';
import { func, shape, number, string, array } from 'prop-types';
import { connect } from 'react-redux';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import { createRegionAction, getRegionsByCompanyIdAction } from '../../store/actions/region';

/* @Selectors */
import { getCurrentCompanySelector } from '../../store/selectors/company';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
  createRegion: func,
  getRegionsByCompanyId: func,
  company: shape({
    id: number,
    name: string,
    regions: array,
  }),
};

const DashboardContentContainer = ({ createRegion, getRegionsByCompanyId, company }) => {
  const { id, regions } = company;

  useEffect(() => {
    !!id && getRegionsByCompanyId(id);
  }, [id]);

  const [isShowCreateRegionModal, setIsShowCreateRegionModal] = useState(false);

  const handleOpenCreateRegionModal = () => {
    setIsShowCreateRegionModal(true);
  };

  const handleSubmitCreateCompanyModal = async (values) => {
    const { message, isSuccess } = await createRegion({ ...values, companyId: company.id });

    if (isSuccess) {
      notification('success', message);
      setIsShowCreateRegionModal(false);
      return;
    }

    notification('warning', message);
  };

  const handleCancel = () => {
    setIsShowCreateRegionModal(false);
  };

  const handleDeleteRegion = (id) => {
    console.log('handleDeleteRegion', id);
  };

  const handleEditRegion = (id) => {
    console.log('handleEditRegion', id);
  };

  const handleRegionClick = (id) => {
    console.log('handleRegionClick', id);
  };

  return (
    <DashboardContentComponent
      company={company}
      createRegion={createRegion}
      isShowCreateRegionModal={isShowCreateRegionModal}
      onOpenCreateRegionModal={handleOpenCreateRegionModal}
      onSubmitCreateCompanyModal={handleSubmitCreateCompanyModal}
      onCancel={handleCancel}
      onDeleteRegion={handleDeleteRegion}
      onEditRegion={handleEditRegion}
      onRegionClick={handleRegionClick}
    />
  );
};

DashboardContentComponent.propTypes = propTypes;

const actions = {
  createRegion: createRegionAction,
  getRegionsByCompanyId: getRegionsByCompanyIdAction,
};

const props = (state) => {
  return {
    company: getCurrentCompanySelector(state),
  };
};

export default connect(props, actions)(DashboardContentContainer);
