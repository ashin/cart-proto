import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render } from 'enzyme';
chai.use(spies);

import Ads from './Ads';

describe("<Ads />", function() {
  it("Is creating all ads", function() {
    const spy = chai.spy();
    const ads = [
        {
            id: 'id',
            name: 'Cool Ads',
            price: 123.45
        },
        {
            id: 'id2',
            name: 'Coolest Ads',
            price: 223.45
        },
    ];
    const wrapper = shallow(<Ads ads={ads} onAdClick={spy} />);
    expect(wrapper.find('Ad')).to.have.length(2);
    
  });
});