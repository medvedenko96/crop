import React, { useEffect, useState } from 'react';
import { func, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

/* @Antd */
import { message as antdMessage } from 'antd';

/* @Components */
import FieldsListComponent from './FieldsListComponent';

/* @Actions */
import { createFieldAction, getFieldsAction, setCurrentFieldIdAction } from '../../store/actions/field';

/* @Selectors */
import { getRegionsSelector, getFieldsSelector, getCurrentCompanyIdSelector } from '../../store/selectors';

const notification = (type, message) => antdMessage[type](message);

const propTypes = {
  createField: func,
  getFields: func,
  setCurrentFieldId: func,
  currentCompanyId: number,
  currentRegionId: number,
  currentFieldId: number,
  fieldsById: object,
  fieldsIds: object,
};

const FieldsListContainer = ({
  createField,
  getFields,
  setCurrentFieldId,
  goTo,
  currentCompanyId,
  currentRegionId,
  currentFieldId,
  fieldsById,
  fieldsIds,
}) => {
  useEffect(() => {
    !!currentRegionId && getFields(currentRegionId);
  }, [currentRegionId]);

  const [isShowCreateFieldModal, setIsShowCreateFieldModal] = useState(false);

  const handleOpenCreateFieldModal = () => {
    setIsShowCreateFieldModal(true);
  };

  const handleCancelModal = () => {
    setIsShowCreateFieldModal(false);
  };

  const handleSubmitCreateCompanyModal = async (values) => {
    const { message, isSuccess } = await createField({ ...values, regionId: currentRegionId });

    if (isSuccess) {
      notification('success', message);
      setIsShowCreateFieldModal(false);
      return;
    }

    notification('warning', message);
  };

  const handleFieldClick = (id) => {
    const url = `/dashboard/${currentCompanyId}/${currentRegionId}/${id}`;

    setCurrentFieldId(id);
    goTo(url);
  };

  return (
    <FieldsListComponent
      regionId={currentRegionId}
      fieldsById={fieldsById}
      fieldsIds={fieldsIds}
      currentFieldId={currentFieldId}
      isShowCreateFieldModal={isShowCreateFieldModal}
      onSubmitCreateCompanyModal={handleSubmitCreateCompanyModal}
      onCancelModal={handleCancelModal}
      onOpenCreateFieldModal={handleOpenCreateFieldModal}
      onFieldClick={handleFieldClick}
    />
  );
};

FieldsListContainer.propTypes = propTypes;

FieldsListContainer.displayName = 'FieldsListContainer';

const mapDispatchToProps = {
  createField: createFieldAction,
  getFields: getFieldsAction,
  setCurrentFieldId: setCurrentFieldIdAction,
  goTo: push,
};

const mapStateToProps = (state) => {
  const { currentRegionId } = getRegionsSelector(state);
  const { fieldsById, fieldsIds, currentFieldId } = getFieldsSelector(state);

  return {
    currentCompanyId: getCurrentCompanyIdSelector(state),
    currentRegionId,
    fieldsById,
    fieldsIds,
    currentFieldId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldsListContainer);
