import React, { PropTypes } from 'react';

import Ad from '../Ad/Ad';
import styles from './ads.css';

const Ads = ({ ads, onAdClick }) => (
    <div className={styles.container}>
        <h4 className={styles.title}>Select from our range of ad types</h4>
        <ul className={styles.list}>
            {
                ads.map(ad => <Ad
                    key={ad.id}
                    {...ad}
                    onAdClick={onAdClick}
                />)
            }
        </ul>
    </div>
);

Ads.propTypes = {
  ads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  onAdClick: PropTypes.func.isRequired,
};

export default Ads;
