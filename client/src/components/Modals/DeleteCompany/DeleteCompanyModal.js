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

const DeleteCompanyModal = ({ isShowModal, onOk, handleCancel }) => {
  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Please input company login!'),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
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
    <Modal title="Delete company" visible={isShowModal} onOk={handleSubmit} onCancel={onCancel}>
      <form>
        <Item
          name="login"
          label="Company login"
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

DeleteCompanyModal.propTypes = propTypes;

export default DeleteCompanyModal;
