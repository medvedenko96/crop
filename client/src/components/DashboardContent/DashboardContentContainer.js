import React, { useState, useEffect } from 'react';
import { func, shape, number, string, array } from 'prop-types';
import { connect } from 'react-redux';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import { createRegionAction, getRegionsByCompanyIdAction, deleteRegionByIdAction } from '../../store/actions/region';

/* @Selectors */
import { getCurrentCompanySelector } from '../../store/selectors/company';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
  createRegion: func,
  getRegionsByCompanyId: func,
  deleteRegionById: func,
  company: shape({
    id: number,
    name: string,
    regions: array,
  }),
};

const DashboardContentContainer = ({ createRegion, getRegionsByCompanyId, deleteRegionById, company }) => {
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

  const handleDeleteRegion = async (id) => {
    const isSuccess = await deleteRegionById(id);

    isSuccess ? notification('success', 'success') : notification('warning', 'warning');
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
  deleteRegionById: deleteRegionByIdAction,
};

const props = (state) => {
  return {
    company: getCurrentCompanySelector(state),
  };
};

export default connect(props, actions)(DashboardContentContainer);
