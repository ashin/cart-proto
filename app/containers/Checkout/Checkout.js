import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import {
    getAdListAsArray,
    getAdErrorMessage,
    getAdIsFetching,
    getTotal,
    getCartListAsArray,
    getCompanyListAsArray,
    getCompanyErrorMessage,
    getCompanyIsFetching,
    getCompanySelected,
    getCartListCount,
} from '../../reducers';
import Ads from '../../components/Ads/Ads';
import Cart from '../../components/Cart/Cart';
import Total from '../../components/Total/Total';
import SelectCompany from '../../components/SelectCompany/SelectCompany';

import styles from './checkout.css';

class Checkout extends Component {
    fetchData() {
        this.props.fetchAds();
        this.props.fetchCompanies();
    }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        const {
            ads,
            addToCart,
            selectedCompany,
            total,
            cart,
            getTotal,
            selectCompany,
            companies,
            companiesErrorMessage,
            companiesIsFetching,
            fetchCompanies,
            getCartListCount,
            cartCount,
    } = this.props;
        return (
            <div className={styles.container}>
                <SelectCompany
                    companies={companies}
                    companiesErrorMessage={companiesErrorMessage}
                    companiesIsFetching={companiesIsFetching}
                    onSelect={selectCompany}
                    retry={fetchCompanies}
                />
                { !!selectedCompany && [
                        <Ads ads={ads} onAdClick={addToCart} />,
                        <Cart cart={cart} />,
                        (!!cartCount && <Total total={total} calculate={getTotal} />),
                    ]
                }
            </div>
        );
    }
};
const mapStateToProps = (state, ownProps) => ({
    ads: getAdListAsArray(state),
    adsErrorMessage: getAdErrorMessage(state),
    adsIsFetching: getAdIsFetching(state),
    selectedCompany: getCompanySelected(state),
    companies: getCompanyListAsArray(state),
    companiesErrorMessage: getCompanyErrorMessage(state),
    companiesIsFetching: getCompanyIsFetching(state),
    total: getTotal(state),
    cart: getCartListAsArray(state),
    cartCount: getCartListCount(state),
});

export default connect(
    mapStateToProps,
    actions,
)(Checkout);