import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render } from 'enzyme';
chai.use(spies);

import SelectCompany from './SelectCompany';

describe("<SelectCompany />", function() {
  it("contains a loader", function() {
    const onClick = chai.spy();
    const companies = []
    const companiesErrorMessage = '';
    const companiesIsFetching = true;
    const onSelect = chai.spy();
    const retry = chai.spy();

    const wrapper = shallow(
        <SelectCompany
            companies={companies}
            companiesErrorMessage={companiesErrorMessage}
            companiesIsFetching={companiesIsFetching}
            onSelect={onSelect}
            retry={retry}
        />
    );
    expect(wrapper.text()).to.equal('Loading...');
  });

it("contains a loader error, with a button", function() {
    const onClick = chai.spy();
    const companies = []
    const companiesErrorMessage = 'Sorry there was an error';
    const companiesIsFetching = false;
    const onSelect = chai.spy();
    const retry = chai.spy();

    const wrapper = shallow(
        <SelectCompany
            companies={companies}
            companiesErrorMessage={companiesErrorMessage}
            companiesIsFetching={companiesIsFetching}
            onSelect={onSelect}
            retry={retry}
        />
    );
    expect(wrapper.text()).to.contain('Fetching companies failed.');
    wrapper.find('button').simulate('click');
    expect(retry).to.have.been.called.once();

  });

it("contains a list of companies, that are selectable", function() {
    const onClick = chai.spy();
    const companies = [
        {
            id: 'cool-company',
            name: 'Cool Company'
        },
        {
            id: 'coolest-company',
            name: 'Coolest Company'
        },
    ]
    const companiesErrorMessage = '';
    const companiesIsFetching = false;
    const onSelect = chai.spy();
    const retry = chai.spy();

    const wrapper = shallow(
        <SelectCompany
            companies={companies}
            companiesErrorMessage={companiesErrorMessage}
            companiesIsFetching={companiesIsFetching}
            onSelect={onSelect}
            retry={retry}
        />
    );
    expect(wrapper.find('option')).to.have.length(3);
    wrapper.find('select').simulate('change', { target: { value: 'coolest-company' } });
    expect(onSelect).to.have.been.called.once.with('coolest-company');

  });
});