import React, { PropTypes } from 'react';

import styles from './Ad.css';
import Price from '../Price/Price';

const Ad = ({ name, id, price, onAdClick }) => (
    <li key={id} className={styles.container}>
        <h3 className={styles.name}>{ name }</h3>
        <Price price={ price } className={styles.price} />
        <button
             className={styles.button}
            onClick={() => onAdClick(id, price)}
        >
            Add { name }
        </button>
    </li>
);

Ad.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onAdClick: PropTypes.func.isRequired,
};

export default Ad;
