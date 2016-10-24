import { combineReducers } from 'redux';
import * as cartHelper from '../../helpers/cart'

export const constants = {
    add: 'ADD_TO_CART',
    remove: 'REMOVE_FROM_CART',
    sendRequest: 'SEND_CART_REQUEST',
    sendSuccess: 'SEND_CART_SUCCESS',
    sendFailure: 'SEND_CART_FAILURE',
};

const list = (state = {}, action) => {
    switch (action.type) {
        case constants.add:
            return cartHelper.addItem(state, {
                id: action.id,
                price: action.price,
            })
            return action.companyId;
        default:
            return state;
    }
};

const isSending = (state = false, action) => {
    switch (action.type) {
        case constants.sendingRequest:
            return true;
        case constants.sendingSuccess:
        case constants.sendingFailure:
            return false;
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case constants.sendingFailure:
            return action.message;
        case constants.sendingRequest:
        case constants.sendingSuccess:
            return null;
        default:
            return state;
    }
}

const cart = combineReducers({
    list,
    isSending,
    errorMessage,
});

export default cart;

// selectors
export const getList = state => state.list;
export const getListAsArray = state => {
    const list = getList(state) || {};
    return Object.keys(list).map(key => list[key]);
};
export const getIsSending = state => state.isSending;
export const getErrorMessage = state => state.errorMessage;
export const getListCount = state => getListAsArray(state).length;
