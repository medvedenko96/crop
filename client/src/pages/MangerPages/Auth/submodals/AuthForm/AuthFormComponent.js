import React from 'react';
import { func, string, object } from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* @Antd */
import { Form, Input, Button } from 'antd';

/* @Icons */
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';

import styles from './AuthForm.module.css';

const { Item } = Form;

const propTypes = {
	onSubmitButtonClick: func,
	serverError: string,
	intl: object,
};

const AuthFormComponent = ({ onSubmitButtonClick, serverError, intl }) => {
	const [form] = Form.useForm();

	const validationSchema = Yup.object().shape({
		login: Yup.string().required(intl.formatMessage({ id: 'auth.validationLoginRequired' })),
		password: Yup.string().required(
			intl.formatMessage({ id: 'auth.validationPasswordRequired' })
		),
	});

	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
		},
		validateOnChange: false,
		validationSchema,
		onSubmit: (values) => onSubmitButtonClick(values),
	});

	const { handleSubmit, errors, values, handleChange } = formik;

	return (
		<div className={styles.wrapper}>
			<Form form={form} id="login-manager" onFinish={handleSubmit}>
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
						placeholder={intl.formatMessage({ id: 'login' })}
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
						placeholder={intl.formatMessage({ id: 'password' })}
						autoComplete="on"
					/>
				</Item>
				<Button
					className="login-form-button"
					form="login-manager"
					type="primary"
					htmlType="submit"
				>
					{intl.formatMessage({ id: 'auth.enter' })}
				</Button>
			</Form>
		</div>
	);
};

AuthFormComponent.propTypes = propTypes;

AuthFormComponent.displayName = 'AuthFormComponent';

export default AuthFormComponent;
