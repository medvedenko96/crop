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

const AddFileModal = ({ intl, isShowModal, onOk, handleCancel }) => {
	const [form] = Form.useForm();

	const initialValues = {
		fileUrl: '',
		fileName: '',
	};

	const validationSchema = Yup.object().shape({
		fileUrl: Yup.string().required(intl.formatMessage({ id: 'validation.fileUrlRequired' })),
		fileName: Yup.string().required(intl.formatMessage({ id: 'validation.fileNameRequired' })),
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
			title={intl.formatMessage({ id: 'file.add' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{ form: 'add-file', key: 'submit', htmlType: 'submit' }}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form form={form} id="add-file" onFinish={handleSubmit}>
				<Item
					name="fileName"
					label={intl.formatMessage({ id: 'file.name' })}
					validateStatus={errors.fileName}
					onChange={handleChange}
					value={values.fileName}
					{...(errors.fileName && {
						validateStatus: 'error',
						help: errors.fileName,
					})}
				>
					<Input />
				</Item>
				<Item
					name="fileUrl"
					label={intl.formatMessage({ id: 'file.url' })}
					validateStatus={errors.fileUrl}
					onChange={handleChange}
					value={values.fileUrl}
					{...(errors.fileUrl && {
						validateStatus: 'error',
						help: errors.fileUrl,
					})}
				>
					<Input />
				</Item>
			</Form>
		</Modal>
	);
};

AddFileModal.propTypes = propTypes;

export default AddFileModal;
