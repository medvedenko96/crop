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

const UpdateRegionModal = ({ isShowModal, onOk, handleCancel }) => {
	const intl = useIntl();

	const validationSchema = Yup.object().shape({
		regionName: Yup.string().required(
			intl.formatMessage({ id: 'region.validationNewRegionNameRequired' })
		),
	});

	const formik = useFormik({
		initialValues: {
			regionName: '',
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
			title={intl.formatMessage({ id: 'region.updateName' })}
			visible={isShowModal}
			onOk={handleSubmit}
			onCancel={onCancel}
			okText={intl.formatMessage({ id: 'okModalSaveText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
		>
			<Form>
				<Item
					name="regionName"
					label={intl.formatMessage({ id: 'region.newName' })}
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

UpdateRegionModal.propTypes = propTypes;

export default UpdateRegionModal;
