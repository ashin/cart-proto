import { combineReducers } from 'redux';

export const constants = {
    fetchRequest: 'FETCH_ADS_REQUEST',
    fetchSuccess: 'FETCH_ADS_SUCCESS',
    fetchFailure: 'FETCH_ADS_FAILURE',
};

const list = (state = {}, action) => {
    switch (action.type) {
        case constants.fetchSuccess:
            return action.response.entities.ads;
        default:
            return state;
    }
};
const isFetching = (state = false, action) => {
    switch (action.type) {
        case constants.fetchRequest:
            return true;
        case constants.fetchSuccess:
        case constants.fetchFailure:
            return false;
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case constants.fetchFailure:
            return action.message;
        case constants.fetchRequest:
        case constants.fetchSuccess:
            return null;
        default:
            return state;
    }
}
const ad = combineReducers({
    list,
    isFetching,
    errorMessage,
})

export default ad;

// selectors
export const getList = state => state.list;
export const getListAsArray = state => {
    const list = getList(state) || {};
    return Object.keys(list).map(key => list[key]);
};
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;