import React, { useState, useEffect } from 'react';
import { func, shape, number, string, array } from 'prop-types';
import { connect } from 'react-redux';

/* @Components */
import DashboardContentComponent from './DashboardContentComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import {
  createRegionAction,
  getRegionsByCompanyIdAction,
  deleteRegionByIdAction,
  updateRegionByIdAction,
} from '../../store/actions/region';

/* @Selectors */
import { getCurrentCompanySelector } from '../../store/selectors/company';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
  createRegion: func,
  getRegionsByCompanyId: func,
  deleteRegionById: func,
  updateRegionById: func,
  company: shape({
    id: number,
    name: string,
    regions: array,
  }),
};

const DashboardContentContainer = ({
  createRegion,
  getRegionsByCompanyId,
  deleteRegionById,
  updateRegionById,
  company,
}) => {
  const { id } = company;

  useEffect(() => {
    !!id && getRegionsByCompanyId(id);
  }, [id]);

  const [isShowCreateRegionModal, setIsShowCreateRegionModal] = useState(false);
  const [isShowUpdateRegionModal, setIsShowUpdateRegionModal] = useState(false);
  const [currentRegionId, setCurrentRegionId] = useState(null);

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

  const handleUpdateCreateCompanyModal = async (values) => {
    if (!currentRegionId) {
      notification('error', 'error');
      return;
    }

    const { message, isSuccess } = await updateRegionById({ ...values, regionId: currentRegionId, companyId: id });

    if (isSuccess) {
      notification('success', message);
      setIsShowUpdateRegionModal(false);
      setCurrentRegionId(null);
      return;
    }

    notification('warning', message);
  };

  const handleCancel = () => {
    setIsShowCreateRegionModal(false);
    setIsShowUpdateRegionModal(false);
  };

  const handleDeleteRegion = async (id) => {
    const isSuccess = await deleteRegionById(id);

    isSuccess ? notification('success', 'success') : notification('warning', 'warning');
  };

  const handleEditRegionClick = (id) => {
    setIsShowUpdateRegionModal(true);
    setCurrentRegionId(id);
  };

  const handleRegionClick = (id) => {
    console.log('handleRegionClick', id);
  };

  return (
    <DashboardContentComponent
      company={company}
      createRegion={createRegion}
      isShowCreateRegionModal={isShowCreateRegionModal}
      isShowUpdateRegionModal={isShowUpdateRegionModal}
      onOpenCreateRegionModal={handleOpenCreateRegionModal}
      onSubmitCreateCompanyModal={handleSubmitCreateCompanyModal}
      onUpdateCreateCompanyModal={handleUpdateCreateCompanyModal}
      onDeleteRegion={handleDeleteRegion}
      onEditRegionClick={handleEditRegionClick}
      onRegionClick={handleRegionClick}
      onCancel={handleCancel}
    />
  );
};

DashboardContentComponent.propTypes = propTypes;

const actions = {
  createRegion: createRegionAction,
  getRegionsByCompanyId: getRegionsByCompanyIdAction,
  deleteRegionById: deleteRegionByIdAction,
  updateRegionById: updateRegionByIdAction,
};

const props = (state) => {
  return {
    company: getCurrentCompanySelector(state),
  };
};

export default connect(props, actions)(DashboardContentContainer);
