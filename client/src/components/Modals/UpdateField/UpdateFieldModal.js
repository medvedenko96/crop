import React from 'react';
import { func, bool } from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';

/* @Antd */
import { Input, Modal, Form } from 'antd';

const { Item } = Form;

const propTypes = {
	isShowModal: bool,
	onOk: func,
	handleCancel: func,
};

const UpdateFieldModal = ({ isShowModal, onOk, handleCancel }) => {
	const intl = useIntl();

	const validationSchema = Yup.object().shape({
		fieldName: Yup.string().required(
			intl.formatMessage({ id: 'field.validationNewFieldNameRequired' })
		),
	});

	const formik = useFormik({
		initialValues: {
			fieldName: '',
		},
		validationSchema,
		onSubmit: (values) => onOk(values),
	});

	const { handleSubmit, errors, values, handleChange, handleReset } = formik;

	const onCancel = () => {
		handleReset();
		handleCancel();
	};

	return (
		<Modal
			title={intl.formatMessage({ id: 'field.updateName' })}
			visible={isShowModal}
			onOk={handleSubmit}
			onCancel={onCancel}
			okText={intl.formatMessage({ id: 'okModalSaveText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form>
				<Item
					name="fieldName"
					label={intl.formatMessage({ id: 'field.newName' })}
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

UpdateFieldModal.propTypes = propTypes;

export default UpdateFieldModal;
