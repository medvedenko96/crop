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

const CreateYearModal = ({ intl, isShowModal, onOk, handleCancel }) => {
	const [form] = Form.useForm();

	const initialValues = {
		year: '',
		crop: '',
	};

	const validationSchema = Yup.object().shape({
		year: Yup.string()
			.required(intl.formatMessage({ id: 'validation.yearRequired' }))
			.length(4, intl.formatMessage({ id: 'validation.year' })),
		crop: Yup.string().required(intl.formatMessage({ id: 'validation.cropRequired' })),
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
			title={intl.formatMessage({ id: 'year.add' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{ form: 'create-year', key: 'submit', htmlType: 'submit' }}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form form={form} id="create-year" onFinish={handleSubmit}>
				<Item
					name="year"
					label={intl.formatMessage({ id: 'year.name' })}
					validateStatus={errors.year}
					onChange={handleChange}
					value={values.year}
					{...(errors.year && {
						validateStatus: 'error',
						help: errors.year,
					})}
				>
					<Input />
				</Item>
				<Item
					name="crop"
					label={intl.formatMessage({ id: 'year.crop' })}
					validateStatus={errors.crop}
					onChange={handleChange}
					value={values.crop}
					{...(errors.crop && {
						validateStatus: 'error',
						help: errors.crop,
					})}
				>
					<Input />
				</Item>
			</Form>
		</Modal>
	);
};

CreateYearModal.propTypes = propTypes;

export default CreateYearModal;
