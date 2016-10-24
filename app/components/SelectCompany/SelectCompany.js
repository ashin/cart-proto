import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectCompany } from '../../actions';

import { getCompanyListAsArray, getCompanyErrorMessage, getCompanyIsFetching } from '../../reducers';
import styles from './selectCompany.css';

const SelectCompany = ({companies, companiesErrorMessage, companiesIsFetching, onSelect, retry}) => {
    const loadingMessage = () => (<div>Loading...</div>);
    const retryMessage = () => (<div>Fetching companies failed. <button onClick={retry}>Try again</button></div>);
    const selectCompany = () => (
        <div className={styles.selectContainer}>
            <label className={styles.label}>Please select an account:</label>
            <select className={styles.select}
                onChange={(e) => onSelect(e.target.value)}
            >
                <option value="">select company</option>
                { companies.map(company => (<option value={company.id} key={company.id}>{company.name}</option>)) }
            </select>
        </div>
    );
    
    return (
        <div className={styles.container}>
            {companiesIsFetching && loadingMessage()}
            {companiesErrorMessage && retryMessage()}
            {!companiesIsFetching && !companiesErrorMessage && selectCompany()}
        </div>
    );
};

SelectCompany.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })),
    companiesErrorMessage: PropTypes.string,
    companiesIsFetching: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    retry: PropTypes.func.isRequired,
};

export default SelectCompany;