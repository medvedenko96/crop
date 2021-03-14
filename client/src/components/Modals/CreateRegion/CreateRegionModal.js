import React from 'react';
import { func, bool } from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* @Antd */
import { Input, Modal, Form } from 'antd';

const { Item } = Form;

const propTypes = {
  isShowModal: bool,
  onOk: func,
  handleCancel: func,
};

const CreateRegionModal = ({ isShowModal, onOk, handleCancel }) => {
  const validationSchema = Yup.object().shape({
    regionName: Yup.string().required('Please input region name!'),
  });

  const formik = useFormik({
    initialValues: {
      regionName: '',
    },
    validationSchema,
    onSubmit: (values) => onOk(values),
  });

  const { handleSubmit, errors, values, handleChange, handleReset } = formik;

  const onCancel = () => {
    handleReset();
    handleCancel();
  };

  return (
    <Modal title="Create region" visible={isShowModal} onOk={handleSubmit} onCancel={onCancel}>
      <form>
        <Item
          name="regionName"
          label="Region name"
          validateStatus={errors.login}
          onChange={handleChange}
          value={values.login}
          {...(errors.login && {
            validateStatus: 'error',
            help: errors.login,
          })}
        >
          <Input />
        </Item>
      </form>
    </Modal>
  );
};

CreateRegionModal.propTypes = propTypes;

export default CreateRegionModal;
