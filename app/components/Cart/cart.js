import React, { PropTypes } from 'react';

import Price from '../Price/Price';
import styles from './cart.css';

const Cart = ({ cart }) => {
    return (
        <div className={styles.container}>
            <h3>Your cart</h3>
            { !cart.length && <span>...is empty. You should buy something.</span>}
            <ul className={styles.list}>
                {
                    cart.map(item => (
                        <li  className={styles.item} key={item.id}>
                            <span className={styles.count}>{item.count}</span>x 
                            <span className={styles.type}>{item.id}</span> @ <Price price={item.price} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    })),
};

export default Cart;
