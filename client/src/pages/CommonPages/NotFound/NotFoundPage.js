import React from 'react';
import { useIntl } from 'react-intl';

/* @Antd */
import { Result, Button } from 'antd';

const NotFoundPage = () => {
    const intl = useIntl();

    return (
        <Result
            status="404"
            title="404"
            subTitle={intl.formatMessage({ id: 'notFound.subTitle' })}
            extra={
                <Button type="primary">{intl.formatMessage({ id: 'notFound.buttonText' })}</Button>
            }
        />
    );
};

export default NotFoundPage;
