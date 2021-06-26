import React, { useEffect } from 'react';
import { func, bool, object, shape, number, string } from 'prop-types';
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
	fileInfo: shape({
		id: number,
		fileName: string,
		fileUrl: string,
	}),
};

const EditFileModal = ({ intl, isShowModal, onOk, handleCancel, fileInfo }) => {
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
			onOk({ ...values, id: fileInfo.id });
			form.resetFields();
		},
	});

	const { handleSubmit, errors, values, handleChange, setValues } = formik;

	useEffect(() => {
		form.setFieldsValue({
			fileUrl: fileInfo.fileUrl,
			fileName: fileInfo.fileName,
		});

		setValues({
			fileUrl: fileInfo.fileUrl,
			fileName: fileInfo.fileName,
		});
	}, [fileInfo]);

	return (
		<Modal
			title={intl.formatMessage({ id: 'file.add' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{
				form: 'edit-file',
				key: 'submit',
				htmlType: 'submit',
				disabled:
					fileInfo.fileUrl === values.fileUrl && fileInfo.fileName === values.fileName,
			}}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
			forceRender
		>
			<Form form={form} id="edit-file" onFinish={handleSubmit}>
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

EditFileModal.propTypes = propTypes;

export default EditFileModal;
