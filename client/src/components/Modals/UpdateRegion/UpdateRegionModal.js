import React from 'react';
import { func, bool } from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* @Antd */
import { Input, Modal, Form } from 'antd';

const { Item } = Form;

const propTypes = {
    isShowModal: bool,
    onOk: func,
    handleCancel: func
};

const UpdateRegionModal = ({ isShowModal, onOk, handleCancel }) => {
    const validationSchema = Yup.object().shape({
        regionName: Yup.string().required('Please input new region name!')
    });

    const formik = useFormik({
        initialValues: {
            regionName: ''
        },
        validationSchema,
        onSubmit: (values) => onOk(values)
    });

    const { handleSubmit, errors, values, handleChange, handleReset } = formik;

    const onCancel = () => {
        handleReset();
        handleCancel();
    };

    return (
        <Modal title="Update region" visible={isShowModal} onOk={handleSubmit} onCancel={onCancel}>
            <Form>
                <Item
                    name="regionName"
                    label="New region name"
                    validateStatus={errors.login}
                    onChange={handleChange}
                    value={values.login}
                    {...(errors.login && {
                        validateStatus: 'error',
                        help: errors.login
                    })}>
                    <Input />
                </Item>
            </Form>
        </Modal>
    );
};

UpdateRegionModal.propTypes = propTypes;

export default UpdateRegionModal;
