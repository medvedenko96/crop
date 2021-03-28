import React from 'react';
import { IntlProvider } from 'react-intl';

/* @Router */
import Router from './Router';

/* @Localization */
import localization from './localization';

/* @Styles */
import './index.less';

const App = () => {
    return (
        <IntlProvider messages={localization} locale="ua" defaultLocale="ua">
            <Router />
        </IntlProvider>
    );
};

export default App;
