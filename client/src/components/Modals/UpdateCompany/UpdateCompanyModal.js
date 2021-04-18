import React, { useEffect } from 'react';
import { func, bool, shape, string, object } from 'prop-types';
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
	companyInfo: shape({
		login: string,
		name: string,
	}),
};

const UpdateCompanyModal = ({ intl, isShowModal, onOk, handleCancel, companyInfo }) => {
	const [form] = Form.useForm();

	const validationSchema = Yup.object().shape({
		login: Yup.string()
			.required(intl.formatMessage({ id: 'validation.companyLoginRequired' }))
			.min(4, intl.formatMessage({ id: 'validation.min' }, { count: 4 }))
			.max(20, intl.formatMessage({ id: 'validation.max' }, { count: 20 })),
		companyName: Yup.string()
			.required(intl.formatMessage({ id: 'validation.companyNameRequired' }))
			.min(2, intl.formatMessage({ id: 'validation.min' }, { count: 2 }))
			.max(30, intl.formatMessage({ id: 'validation.max' }, { count: 30 })),
	});

	const initialValues = {
		login: '',
		companyName: '',
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnChange: false,
		onSubmit: (values) => onOk(values),
	});

	const { handleSubmit, errors, values, handleChange, setValues } = formik;

	useEffect(() => {
		form.setFieldsValue({
			login: companyInfo.login,
			companyName: companyInfo.name,
		});

		setValues({
			login: companyInfo.login,
			companyName: companyInfo.name,
		});
	}, [companyInfo]);

	return (
		<Modal
			title={intl.formatMessage({ id: 'company.update' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{
				form: 'update-company',
				key: 'submit',
				htmlType: 'submit',
				disabled:
					companyInfo.name === values.companyName && companyInfo.login === values.login,
			}}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
			forceRender
		>
			<Form form={form} id="update-company" onFinish={handleSubmit}>
				<Item
					name="companyName"
					label={intl.formatMessage({ id: 'name' })}
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
			</Form>
		</Modal>
	);
};

UpdateCompanyModal.propTypes = propTypes;

UpdateCompanyModal.defaultProps = {
	companyInfo: { name: '', login: '' },
};

export default UpdateCompanyModal;
