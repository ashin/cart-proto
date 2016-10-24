import { combineReducers } from 'redux';

import company, * as fromCompany from './company/company';
import ad, * as fromAd from './ad/ad';
import cart, * as fromCart from './cart/cart';
import total from './total/total';

const storeApp = combineReducers({
  company,
  ad,
  cart,
  total,
});

export default storeApp;

// selectors
export const getCompanyList = state => fromCompany.getList(state.company);
export const getCompanyListAsArray = state => fromCompany.getListAsArray(state.company);
export const getCompanyErrorMessage = state => fromCompany.getErrorMessage(state.company);
export const getCompanyIsFetching = state => fromCompany.getIsFetching(state.company);
export const getCompanySelected = state => fromCompany.getSelected(state.company);
export const getCompanySelectedId = state => fromCompany.getSelectedId(state.company);
export const getCompanySelectedDeals = state => fromCompany.getSelectedDeals(state.company);

export const getAdList = state => fromAd.getList(state.ad);
export const getAdListAsArray = state => fromAd.getListAsArray(state.ad);
export const getAdErrorMessage = state => fromAd.getErrorMessage(state.ad);
export const getAdIsFetching = state => fromAd.getIsFetching(state.ad);

export const getCartList = state => fromCart.getList(state.cart);
export const getCartListAsArray = state => fromCart.getListAsArray(state.cart);
export const getCartIsSending = state => fromCart.getIsSending(state.cart);
export const getCartErrorMessage = state => fromCart.getErrorMessage(state.cart);
export const getCartListCount = state => fromCart.getListCount(state.cart);

export const getTotal = state => state.total;
