import React from 'react';
import { useFormik } from 'formik';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';

import styles from './Login.module.css';

const { Item } = Form;

const LoginComponent = ({ onSubmit, serverError }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Please input your username!'),
    password: Yup.string()
      .required('Please input your password!'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      onSubmit(values)
    },
  });

  const { handleSubmit, errors, values, handleChange } = formik;

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmit}
      >
        <Item
          name="username"
          wrapperCol={{span: 24, offset: 0}}
          validateStatus={errors.username}
          onChange={handleChange}
          value={values.username}
          {...(errors.username && ({ validateStatus: "error", help: errors.username }))}
        >
          <Input
            prefix={<UserOutlined className={styles.input_icon} />}
            placeholder="Username"
          />
        </Item>
        <Item
          name="password"
          onChange={handleChange}
          value={values.password}
          {...(errors.password && ({ validateStatus: "error", help: errors.password }))}
          {...(serverError &&  { help: (<div className={styles.input_error}>{serverError}</div>) })}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.input_icon} />}
            placeholder="Password"
          />
        </Item>
        <div className={styles.forgot} href="">
          Forgot password
        </div>
        <Item>
          <Button className="login-form-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </form>
    </div>
  )
};

export default LoginComponent;
