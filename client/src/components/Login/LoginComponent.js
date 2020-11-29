import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* @Antd */
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './Login.module.css';

const { Item } = Form;

const LoginComponent = ({ onSubmit, serverError }) => {
  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Please input your login!'),
    password: Yup.string().required('Please input your password!'),
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { handleSubmit, errors, values, handleChange } = formik;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <Item
          name="login"
          wrapperCol={{ span: 24, offset: 0 }}
          validateStatus={errors.login}
          onChange={handleChange}
          value={values.login}
          {...(errors.login && {
            validateStatus: 'error',
            help: errors.login,
          })}
        >
          <Input
            prefix={<UserOutlined className={styles.input_icon} />}
            placeholder="Login"
          />
        </Item>
        <Item
          name="password"
          onChange={handleChange}
          value={values.password}
          {...(errors.password && {
            validateStatus: 'error',
            help: errors.password,
          })}
          {...(serverError && {
            help: <div className={styles.input_error}>{serverError}</div>,
          })}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.input_icon} />}
            placeholder="Password"
          />
        </Item>
        <Item>
          <Button
            className="login-form-button"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Item>
      </form>
    </div>
  );
};

export default LoginComponent;
