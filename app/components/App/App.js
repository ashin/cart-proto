import React from 'react';

import Header from '../Header/Header';
import Checkout from '../../containers/Checkout/Checkout';

import styles from './app.css';

const App = () => (
    <div className={styles.container}>
        <Header />
        <Checkout />
    </div>
);

export default App;
