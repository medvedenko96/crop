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

const DeleteCompanyModal = ({ isShowModal, onOk, handleCancel }) => {
	const intl = useIntl();

	const validationSchema = Yup.object().shape({
		login: Yup.string().required(intl.formatMessage({ id: 'company.validationLoginRequired' })),
	});

	const formik = useFormik({
		initialValues: {
			login: '',
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
			title={intl.formatMessage({ id: 'company.delete' })}
			visible={isShowModal}
			onOk={handleSubmit}
			onCancel={onCancel}
			okText={intl.formatMessage({ id: 'okModalDeleteText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form>
				<Item
					name="login"
					label={intl.formatMessage({ id: 'company.login' })}
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

DeleteCompanyModal.propTypes = propTypes;

export default DeleteCompanyModal;
