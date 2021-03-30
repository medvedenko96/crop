import React from 'react';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';

/* @Router */
import Router from './Router';

/* @locales */
import locales from './locales';

/* @Styles */
import './index.less';

const UA = 'ua';

const onIntlError = (error) => {
    if (typeof document === 'undefined') {
        return;
    }

    if (error.code === ReactIntlErrorCode.MISSING_DATA) {
        return;
    }
    console.error(new Error(error));
};

const App = () => {
    return (
        <IntlProvider messages={locales[UA]} locale={UA} defaultLocale={UA} onError={onIntlError}>
            <Router />
        </IntlProvider>
    );
};

export default App;
