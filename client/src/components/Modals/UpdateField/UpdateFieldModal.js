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

const UpdateFieldModal = ({ isShowModal, onOk, handleCancel }) => {
    const validationSchema = Yup.object().shape({
        fieldName: Yup.string().required('Please input new field name!')
    });

    const formik = useFormik({
        initialValues: {
            fieldName: ''
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
        <Modal title="Update field" visible={isShowModal} onOk={handleSubmit} onCancel={onCancel}>
            <Form>
                <Item
                    name="fieldName"
                    label="New field name"
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

UpdateFieldModal.propTypes = propTypes;

export default UpdateFieldModal;
