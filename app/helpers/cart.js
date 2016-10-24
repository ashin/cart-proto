// deepish copy is a 2 level deep copy for CartItems, to stop each item from being passed as reference.
export const deepishCopyCartitems = cartItems => Object.keys(cartItems)
    .map(key => cartItems[key])
    .map(cartItem => ({...cartItem}))
    .reduce(
        (clonedCartItems, cartItem) => {
            clonedCartItems[cartItem.id] = cartItem;
            return clonedCartItems;
        }, {}
    );
    
// Floats? Why did it have to be floats?
export const addTwoPrices = (a, b) => (parseFloat(a) + parseFloat(b)).toFixed(2)/1;

export const addItem = (cartItems = {}, item) => {
    if(!item) return cartItems;
    const newItem = cartItems[item.id] || {
        price: item.price,
        count: 0,
        id: item.id,
    };
    newItem.count++;
    return {
        ...cartItems,
        [item.id]: newItem,
    }
};
export const totalItems = (cartItems = {}, deals = []) => {
    const cartItemsToPayFor = deals.reduce(
        (currentItemsToPayFor, deal) => deal.rule(cartItems, currentItemsToPayFor),
        deepishCopyCartitems(cartItems)
    );
    return Object.keys(cartItemsToPayFor)
        .map(key => cartItemsToPayFor[key])
        .map(item => item.price * item.count)
        .reduce(addTwoPrices, 0);
};