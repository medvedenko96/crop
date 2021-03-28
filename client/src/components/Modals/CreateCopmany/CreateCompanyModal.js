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
    handleCancel: func
};

const CreateCompanyModal = ({ isShowModal, onOk, handleCancel }) => {
    const intl = useIntl();

    const validationSchema = Yup.object().shape({
        login: Yup.string().required(intl.formatMessage({ id: 'company.validationLoginRequired' })),
        companyName: Yup.string().required(
            intl.formatMessage({ id: 'company.validationCompanyNameRequired' })
        ),
        password: Yup.string().required(
            intl.formatMessage({ id: 'company.validationPasswordRequired' })
        )
    });

    const formik = useFormik({
        initialValues: {
            login: '',
            companyName: '',
            password: ''
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
        <Modal
            title={intl.formatMessage({ id: 'company.create' })}
            visible={isShowModal}
            onOk={handleSubmit}
            onCancel={onCancel}
            okText={intl.formatMessage({ id: 'okModalCreateText' })}
            cancelText={intl.formatMessage({ id: 'cancelText' })}>
            <Form>
                <Item
                    name="companyName"
                    label={intl.formatMessage({ id: 'company.name' })}
                    validateStatus={errors.companyName}
                    onChange={handleChange}
                    value={values.companyName}
                    {...(errors.companyName && {
                        validateStatus: 'error',
                        help: errors.companyName
                    })}>
                    <Input />
                </Item>
                <Item
                    name="login"
                    label={intl.formatMessage({ id: 'login' })}
                    validateStatus={errors.login}
                    onChange={handleChange}
                    value={values.login}
                    {...(errors.login && {
                        validateStatus: 'error',
                        help: errors.login
                    })}>
                    <Input />
                </Item>
                <Item
                    name="password"
                    label={intl.formatMessage({ id: 'password' })}
                    validateStatus={errors.password}
                    onChange={handleChange}
                    value={values.password}
                    {...(errors.password && {
                        validateStatus: 'error',
                        help: errors.password
                    })}>
                    <Input />
                </Item>
            </Form>
        </Modal>
    );
};

CreateCompanyModal.propTypes = propTypes;

export default CreateCompanyModal;
