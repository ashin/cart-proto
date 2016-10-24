import { combineReducers } from 'redux';
import * as cartHelper from '../../helpers/cart';

export const constants = {
    get: 'GET_TOTAL',
}
const total = (state = 0, action) => {
    switch (action.type) {
        case constants.get:
            return cartHelper.totalItems(action.cart, action.deals);
        default:
            return state;
    }
};

export default total;