import React, { useEffect } from 'react';
import { func, bool, shape, string } from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';

/* @Antd */
import { Input, Modal, Form } from 'antd';

const { Item } = Form;

const propTypes = {
	isShowModal: bool,
	onOk: func,
	handleCancel: func,
	regionInfo: shape({
		name: string,
	}),
};

const UpdateRegionModal = ({ isShowModal, onOk, handleCancel, regionInfo }) => {
	const intl = useIntl();
	const [form] = Form.useForm();

	const initialValues = {
		regionName: '',
	};

	const validationSchema = Yup.object().shape({
		regionName: Yup.string()
			.required(intl.formatMessage({ id: 'validation.newRegionNameRequired' }))
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
			regionName: regionInfo.name,
		});

		setValues({
			regionName: regionInfo.name,
		});
	}, [regionInfo]);

	return (
		<Modal
			title={intl.formatMessage({ id: 'region.updateName' })}
			visible={isShowModal}
			onCancel={handleCancel}
			okButtonProps={{
				form: 'update-region',
				key: 'submit',
				htmlType: 'submit',
				disabled: regionInfo.name === values.regionName,
			}}
			okText={intl.formatMessage({ id: 'okModalSaveText' })}
			cancelText={intl.formatMessage({ id: 'cancelText' })}
			forceRender
		>
			<Form form={form} id="update-region" onFinish={handleSubmit}>
				<Item
					name="regionName"
					label={intl.formatMessage({ id: 'region.newName' })}
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

UpdateRegionModal.propTypes = propTypes;

UpdateRegionModal.defaultProps = {
	regionInfo: { name: '' },
};

export default UpdateRegionModal;
