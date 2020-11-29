import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* @Antd */
import { Input, Modal, Form } from 'antd';

const { Item } = Form;

const AddCompanyModal = ({ isShowModal, onOk, handleCancel }) => {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Please input company name!'),
    password: Yup.string().required('Please input company password!'),
  });

  const formik = useFormik({
    initialValues: {
      companyName: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => onOk(values),
  });

  const { handleSubmit, errors, values, handleChange, handleReset } = formik;

  const onCancel = () => {
    handleReset();
    handleCancel();
  }

  return (
    <Modal
      title="Add Company"
      visible={isShowModal}
      onOk={handleSubmit}
      onCancel={onCancel}
    >
      <form>
        <Item
          name="companyName"
          label='Company name'
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
          label='Password'
          validateStatus={errors.password}
          onChange={handleChange}
          value={values.password}
          {...(errors.password && {
            validateStatus: 'error',
            help: errors.password,
          })}
        >
          <Input.Password />
        </Item>
      </form>
    </Modal>
  );
}

export default AddCompanyModal;
