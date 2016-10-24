import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from '../../routes';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router children={routes} history={browserHistory} />
    </Provider>
);


Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
