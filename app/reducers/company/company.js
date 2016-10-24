import { combineReducers } from 'redux';

export const constants = {
    fetchRequest: 'FETCH_COMPANIES_REQUEST',
    fetchSuccess: 'FETCH_COMPANIES_SUCCESS',
    fetchFailure: 'FETCH_COMPANIES_FAILURE',
    select: 'SELECT_COMPANY',
};

const list = (state = {}, action) => {
    switch (action.type) {
        case constants.fetchSuccess:
            return action.response.entities.company;
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

const selected = (state = false, action) => {
    switch (action.type) {
        case constants.select:
            return action.companyId;
        default:
            return state;
    }
}

const company = combineReducers({
    list,
    isFetching,
    errorMessage,
    selected,
})

export default company;

// selectors
export const getList = state => state.list;
export const getListAsArray = state => {
    const list = getList(state) || {};
    return Object.keys(list).map(key => list[key]);
};
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
export const getSelectedId = state => state.selected;
export const getSelected = state => state.list[getSelectedId(state)];
export const getSelectedDeals = state => getSelected(state).deals;

