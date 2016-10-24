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