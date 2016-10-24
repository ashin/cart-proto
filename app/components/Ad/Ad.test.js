import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render } from 'enzyme';
chai.use(spies);

import Ad from './Ad';

describe("<Ad />", function() {
  it("contains the needed data", function() {
    const onClick = chai.spy();
    const wrapper = shallow(
        <Ad
            name={'Great ad'}
            id={'great-ad'}
            price={123.45}
            onAdClick={onClick}
        />
    );
    expect(wrapper.find('h3').text()).to.equal('Great ad');
    expect(wrapper.find('Price')).to.have.length(1);
    
    wrapper.find('button').simulate('click');
    expect(onClick).to.have.been.called.once();
    
  });
});