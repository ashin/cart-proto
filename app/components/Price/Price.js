import React, { PropTypes } from 'react';
const Price = ({ price }) => (<span>${price}</span>);

Price.propTypes = {
    price: PropTypes.number.isRequired,
};

export default Price;
