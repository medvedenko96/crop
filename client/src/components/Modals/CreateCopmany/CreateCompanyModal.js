import React from 'react';
import { func, bool, object } from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* @Antd */
import { Input, Modal, Form } from 'antd';

const { Item } = Form;

const propTypes = {
	intl: object,
	isShowModal: bool,
	onOk: func,
	handleCancel: func,
};

const CreateCompanyModal = ({ intl, isShowModal, onOk, handleCancel }) => {
	const [form] = Form.useForm();

	const initialValues = {
		login: '',
		companyName: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		login: Yup.string()
			.required(intl.formatMessage({ id: 'validation.companyLoginRequired' }))
			.min(4, intl.formatMessage({ id: 'validation.min' }, { count: 4 }))
			.max(20, intl.formatMessage({ id: 'validation.max' }, { count: 20 })),
		companyName: Yup.string()
			.required(intl.formatMessage({ id: 'validation.companyNameRequired' }))
			.min(2, intl.formatMessage({ id: 'validation.min' }, { count: 2 }))
			.max(30, intl.formatMessage({ id: 'validation.max' }, { count: 30 })),
		password: Yup.string()
			.required(intl.formatMessage({ id: 'validation.companyPasswordRequired' }))
			.min(8, intl.formatMessage({ id: 'validation.min' }, { count: 8 }))
			.max(20, intl.formatMessage({ id: 'validation.max' }, { count: 20 })),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnChange: false,
		onSubmit: async (values) => {
			onOk(values);
			form.resetFields();
		},
	});

	const { handleSubmit, errors, values, handleChange } = formik;

	return (
		<Modal
			title={intl.formatMessage({ id: 'company.create' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{ form: 'create-company', key: 'submit', htmlType: 'submit' }}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form form={form} id="create-company" onFinish={handleSubmit}>
				<Item
					name="companyName"
					label={intl.formatMessage({ id: 'company.name' })}
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
					name="login"
					label={intl.formatMessage({ id: 'login' })}
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
					name="password"
					label={intl.formatMessage({ id: 'password' })}
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
