import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import styles from './Login.module.css';

const LoginComponent = ({ onSuccess, onFailed }) => (
  <div className={styles.wrapper}>
    <Form
      name="auth"
      initialValues={{ remember: true }}
      onFinish={onSuccess}
      onFinishFailed={onFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default LoginComponent;
