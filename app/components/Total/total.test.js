import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render } from 'enzyme';
chai.use(spies);

import Total from './Total';

describe("<Total />", function() {
  it("displays total", function() {
    const calculate = chai.spy();
    const total = 123.11;
    const wrapper = shallow(
        <Total
            calculate={calculate}
            total={total}
        />
    );
    expect(wrapper.find('p').text())
        .to.equal('Your last calculated total was: $123.11');
    
  });
  it("calls calculations", function() {
    const calculate = chai.spy();
    const total = 123.11;
    const wrapper = shallow(
        <Total
            calculate={calculate}
            total={total}
        />
    );
    wrapper.find('button').simulate('click');
    expect(calculate).to.have.been.called.once();

  });
});