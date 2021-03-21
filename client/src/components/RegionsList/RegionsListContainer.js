import React, { useEffect, useState } from 'react';
import { func, number, shape, string, object } from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { push } from 'connected-react-router';

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
  setCurrentRegionIdAction,
} from '../../store/actions/region';

/* @Selectors */
import { getCurrentCompanySelector, getRegionsSelector } from '../../store/selectors/company';

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
  }),
  currentRegionId: number,
  regionsById: object,
  regionsIds: object,
};

const RegionsListContainer = ({
  createRegion,
  getRegionsByCompanyId,
  deleteRegionById,
  updateRegionById,
  setCurrentRegionId,
  goTo,
  company,
  currentRegionId,
  regionsById,
  regionsIds,
}) => {
  const { id: currentCompanyId = null } = company;
  const { regionId } = useParams();

  useEffect(() => {
    if (!!currentCompanyId && !regionsIds[currentCompanyId]) {
      getRegionsByCompanyId(currentCompanyId);
    }
    regionId && setCurrentRegionId(+regionId);
  }, [currentCompanyId]);

  const [isShowCreateRegionModal, setIsShowCreateRegionModal] = useState(false);
  const [isShowUpdateRegionModal, setIsShowUpdateRegionModal] = useState(false);

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

    const { message, isSuccess } = await updateRegionById({
      ...values,
      regionId: currentRegionId,
      companyId: currentCompanyId,
    });

    if (isSuccess) {
      notification('success', message);
      setIsShowUpdateRegionModal(false);
      return;
    }

    notification('warning', message);
  };

  const handleCancel = () => {
    setIsShowCreateRegionModal(false);
    setIsShowUpdateRegionModal(false);
  };

  const handleDeleteRegion = async (id) => {
    const isSuccess = await deleteRegionById(id, currentCompanyId);

    isSuccess ? notification('success', 'success') : notification('warning', 'warning');
  };

  const handleEditRegionClick = (id) => {
    setIsShowUpdateRegionModal(true);
    setCurrentRegionId(id);
  };

  const handleRegionClick = (id) => {
    const url = `/dashboard/${currentCompanyId}/${id}`;

    setCurrentRegionId(id);
    goTo(url);
  };

  return (
    <RegionsListComponent
      regionsIds={regionsIds}
      regionsById={regionsById}
      currentRegionId={currentRegionId}
      currentCompanyId={currentCompanyId}
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
  setCurrentRegionId: setCurrentRegionIdAction,
  goTo: push,
};

const mapStateToProps = (state) => {
  const { regionsById, regionsIds, currentRegionId } = getRegionsSelector(state);
  return {
    company: getCurrentCompanySelector(state),
    regionsById,
    regionsIds,
    currentRegionId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionsListContainer);
