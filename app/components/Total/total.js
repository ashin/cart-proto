import React, { PropTypes } from 'react';

import styles from './total.css';

const Total = ({ total, calculate }) => (
    <div className={styles.container}>
        <button
            className={styles.button}
            onClick={() => calculate() }
        >
            Calculate your total
        </button>
        <p className={styles.amount}>Your last calculated total was: ${total}</p>
    </div>
);

Total.propTypes = {
    total: PropTypes.number.isRequired,
    calculate: PropTypes.func.isRequired
};

export default Total;
