export const buildNForM = (n, m, type) => (cartItems = {}, cartItemsToPayFor = {}) => {
    if(cartItems[type] && cartItems[type].count >= n) {
        const count = cartItems[type].count;
        const discountAmount = n - m;
        const factor = Math.floor(count / n);
        cartItemsToPayFor[type].count = count - (factor * discountAmount);
    }
    
    return cartItemsToPayFor;
};

export const buildTypeDiscount = (price, type) => (cartItems = {}, cartItemsToPayFor = {}) => {
    if(cartItemsToPayFor[type]) {
        cartItemsToPayFor[type].price = price;
    }
    return cartItemsToPayFor;
};

export const buildTypeDiscountWithMinimum = (price, type, minimum) => (cartItems = {}, cartItemsToPayFor = {}) => {
    if(cartItems[type] && cartItems[type].count >= minimum) {
        cartItemsToPayFor[type].price = price;
    }
    return cartItemsToPayFor;
};

export const buildFreeMembershipDiscount = cartItemThreshold => (cartItems = {}, cartItemsToPayFor = {}) => {
    const cartTotal = Object.keys(cartItems).map(key => cartItems[key])
        .filter(item => item.id !== 'membership')
        .map(item => item.count)
        .reduce((total, count) => count + total);
    if (cartTotal >= cartItemThreshold) {
        cartItemsToPayFor['membership'].price = 0.00;
    }

    return cartItemsToPayFor;
};