import React from 'react';

import SelectCompany from '../SelectCompany/SelectCompany';
import styles from './header.css';

const Header = () => (
    <div className={styles.container}>
        <h1 className={styles.logo}>Seek - Checkout prototype</h1>
    </div>
);

export default Header;
