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

const CreateFieldModal = ({ intl, isShowModal, onOk, handleCancel }) => {
	const [form] = Form.useForm();

	const initialValues = {
		fieldName: '',
	};

	const validationSchema = Yup.object().shape({
		fieldName: Yup.string()
			.required(intl.formatMessage({ id: 'validation.fieldNameRequired' }))
			.min(4, intl.formatMessage({ id: 'validation.min' }, { count: 4 }))
			.max(50, intl.formatMessage({ id: 'validation.max' }, { count: 50 })),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnChange: false,
		onSubmit: (values) => {
			onOk(values);
			form.resetFields();
		},
	});

	const { handleSubmit, errors, values, handleChange } = formik;

	return (
		<Modal
			title={intl.formatMessage({ id: 'field.create' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{ form: 'create-field', key: 'submit', htmlType: 'submit' }}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form form={form} id="create-field" onFinish={handleSubmit}>
				<Item
					name="fieldName"
					label={intl.formatMessage({ id: 'field.name' })}
					validateStatus={errors.fieldName}
					onChange={handleChange}
					value={values.fieldName}
					{...(errors.fieldName && {
						validateStatus: 'error',
						help: errors.fieldName,
					})}
				>
					<Input />
				</Item>
			</Form>
		</Modal>
	);
};

CreateFieldModal.propTypes = propTypes;

export default CreateFieldModal;
