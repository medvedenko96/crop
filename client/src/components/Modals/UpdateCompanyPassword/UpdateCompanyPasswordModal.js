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

const UpdateCompanyPasswordModal = ({ intl, isShowModal, onOk, handleCancel }) => {
	const [form] = Form.useForm();

	const initialValues = {
		secretKey: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		secretKey: Yup.string().required(intl.formatMessage({ id: 'validation.secretKey' })),
		password: Yup.string()
			.required(intl.formatMessage({ id: 'validation.companyPasswordRequired' }))
			.min(8, intl.formatMessage({ id: 'validation.min' }, { count: 8 }))
			.max(20, intl.formatMessage({ id: 'validation.max' }, { count: 20 })),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnChange: false,
		onSubmit: async (values) => onOk(values),
	});

	const { handleSubmit, errors, values, handleChange } = formik;

	return (
		<Modal
			title={intl.formatMessage({ id: 'company.updatePassword' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{ form: 'update-company-password', key: 'submit', htmlType: 'submit' }}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form form={form} id="update-company-password" onFinish={handleSubmit}>
				<Item
					name="secretKey"
					label={intl.formatMessage({ id: 'secretKey' })}
					validateStatus={errors.secretKey}
					onChange={handleChange}
					value={values.secretKey}
					{...(errors.secretKey && {
						validateStatus: 'error',
						help: errors.secretKey,
					})}
				>
					<Input.Password />
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
					<Input.Password />
				</Item>
			</Form>
		</Modal>
	);
};

UpdateCompanyPasswordModal.propTypes = propTypes;

export default UpdateCompanyPasswordModal;
