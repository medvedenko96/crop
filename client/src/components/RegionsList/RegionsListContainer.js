import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

/* @Components */
import RegionsListComponent from './RegionsListComponent';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Actions */
import {
  createRegionAction,
  deleteRegionByIdAction,
  getRegionsByCompanyIdAction,
  updateRegionByIdAction,
} from '../../store/actions/region';
import { push } from 'connected-react-router';

/* @Selectors */
import { getCurrentCompanySelector } from '../../store/selectors/company';
import { array, func, number, shape, string } from 'prop-types';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
  createRegion: func,
  getRegionsByCompanyId: func,
  deleteRegionById: func,
  updateRegionById: func,
  setCurrentRegionId: func,
  goTo: func,
  company: shape({
    id: number,
    name: string,
    regions: array,
  }),
  currentRegionId: number,
};

const RegionsListContainer = ({
  createRegion,
  getRegionsByCompanyId,
  deleteRegionById,
  updateRegionById,
  goTo,
  company,
}) => {
  const { id } = company;
  const { companyId, regionId } = useParams();

  useEffect(() => {
    !!id && getRegionsByCompanyId(id);
  }, [id]);

  const [isShowCreateRegionModal, setIsShowCreateRegionModal] = useState(false);
  const [isShowUpdateRegionModal, setIsShowUpdateRegionModal] = useState(false);
  const [currentRegionId, setCurrentRegionId] = useState(+regionId);

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
    const url = `/dashboard/${companyId}/${id}`;

    setCurrentRegionId(id);
    goTo(url);
  };

  return (
    <RegionsListComponent
      company={company}
      currentRegionId={currentRegionId}
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

RegionsListContainer.propTypes = propTypes;

RegionsListContainer.displayName = 'RegionsListContainer';

const mapDispatchToProps = {
  createRegion: createRegionAction,
  getRegionsByCompanyId: getRegionsByCompanyIdAction,
  deleteRegionById: deleteRegionByIdAction,
  updateRegionById: updateRegionByIdAction,
  goTo: push,
};

const mapStateToProps = (state) => {
  return {
    company: getCurrentCompanySelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionsListContainer);
