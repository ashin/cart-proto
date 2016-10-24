import { normalize } from 'normalizr';

import * as schema from './schema';
import * as api from '../helpers/mock';
import { getCompanyIsFetching, getAdIsFetching, getCartList, getCompanySelectedDeals } from '../reducers';
import { constants as company } from '../reducers/company/company';
import { constants as ad } from '../reducers/ad/ad';
import { constants as cart } from '../reducers/cart/cart';
import { constants as total } from '../reducers/total/total';

export const fetchCompanies = () => (dispatch, getState) => {
    
    if (getCompanyIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: company.fetchRequest,
    });
    return api.fetchCompanies().then(
        response => {
            dispatch({
                type: company.fetchSuccess,
                response: normalize(response, schema.arrayOfCompanies),
            });
        },
        error => {
            dispatch({
                type: company.fetchFailure,
                message: error.message || 'Something went south'
            });
        }
    );
};

export const selectCompany = companyId => dispatch => {
    dispatch({
        type: company.select,
        companyId
    });
}

export const fetchAds = () => (dispatch, getState) => {
    
    if (getAdIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: ad.fetchRequest,
    });
    return api.fetchAds().then(
        response => {
            dispatch({
                type: ad.fetchSuccess,
                response: normalize(response, schema.arrayOfAds),
            });
        },
        error => {
            dispatch({
                type: ad.fetchFailure,
                message: error.message || 'Something went south'
            });
        }
    );
};

export const addToCart = (id, price) => (dispatch, getState) => {
    dispatch({
        type: cart.add,
        id,
        price
    });
};

export const getTotal = () => (dispatch, getState) => {
    const state = getState();
    const cart = getCartList(state);
    const deals = getCompanySelectedDeals(state);
    
    dispatch({
        type: total.get,
        cart,
        deals,
    });
}