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
	fieldInfo: shape({
		name: string,
	}),
};

const UpdateFieldModal = ({ intl, isShowModal, onOk, handleCancel, fieldInfo }) => {
	const [form] = Form.useForm();

	const initialValues = {
		fieldName: '',
	};

	const validationSchema = Yup.object().shape({
		fieldName: Yup.string()
			.required(intl.formatMessage({ id: 'validation.newFieldNameRequired' }))
			.min(4, intl.formatMessage({ id: 'validation.min' }, { count: 4 }))
			.max(50, intl.formatMessage({ id: 'validation.max' }, { count: 50 })),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnChange: false,
		onSubmit: (values) => onOk(values),
	});

	const { handleSubmit, errors, values, handleChange, setValues } = formik;

	useEffect(() => {
		form.setFieldsValue({
			fieldName: fieldInfo.name,
		});

		setValues({
			fieldName: fieldInfo.name,
		});
	}, [fieldInfo]);

	return (
		<Modal
			title={intl.formatMessage({ id: 'field.updateName' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{
				form: 'update-field',
				key: 'submit',
				htmlType: 'submit',
				disabled: fieldInfo.name === values.fieldName,
			}}
			okText={intl.formatMessage({ id: 'okModalSaveText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
			forceRender
		>
			<Form form={form} id="update-field" onFinish={handleSubmit}>
				<Item
					name="fieldName"
					label={intl.formatMessage({ id: 'field.newName' })}
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

UpdateFieldModal.propTypes = propTypes;

UpdateFieldModal.defaultProps = {
	fieldInfo: { name: '' },
};

export default UpdateFieldModal;
