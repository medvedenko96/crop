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

const CreateRegionModal = ({ intl, isShowModal, onOk, handleCancel }) => {
	const [form] = Form.useForm();

	const initialValues = {
		regionName: '',
	};

	const validationSchema = Yup.object().shape({
		regionName: Yup.string()
			.required(intl.formatMessage({ id: 'validation.regionNameRequired' }))
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
			title={intl.formatMessage({ id: 'region.create' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{ form: 'create-region', key: 'submit', htmlType: 'submit' }}
			okText={intl.formatMessage({ id: 'okModalCreateText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form form={form} id="create-region" onFinish={handleSubmit}>
				<Item
					name="regionName"
					label={intl.formatMessage({ id: 'region.name' })}
					validateStatus={errors.regionName}
					onChange={handleChange}
					value={values.regionName}
					{...(errors.regionName && {
						validateStatus: 'error',
						help: errors.regionName,
					})}
				>
					<Input />
				</Item>
			</Form>
		</Modal>
	);
};

CreateRegionModal.propTypes = propTypes;

export default CreateRegionModal;
