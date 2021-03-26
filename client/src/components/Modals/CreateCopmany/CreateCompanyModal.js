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

const CreateCompanyModal = ({ isShowModal, onOk, handleCancel }) => {
  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Please input company login!'),
    companyName: Yup.string().required('Please input company name!'),
    password: Yup.string().required('Please input company password!'),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      companyName: '',
      password: '',
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
    <Modal title="Create company" visible={isShowModal} onOk={handleSubmit} onCancel={onCancel}>
      <Form>
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
        <Item
          name="companyName"
          label="Company name"
          validateStatus={errors.companyName}
          onChange={handleChange}
          value={values.companyName}
          {...(errors.companyName && {
            validateStatus: 'error',
            help: errors.companyName,
          })}
        >
          <Input />
        </Item>
        <Item
          name="password"
          label="Password"
          validateStatus={errors.password}
          onChange={handleChange}
          value={values.password}
          {...(errors.password && {
            validateStatus: 'error',
            help: errors.password,
          })}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

CreateCompanyModal.propTypes = propTypes;

export default CreateCompanyModal;
