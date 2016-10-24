import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render } from 'enzyme';
chai.use(spies);

import Cart from './Cart';

describe("<Cart />", function() {
  it("to display empty message", function() {
    const cart = [];
    const wrapper = shallow(<Cart cart={cart} />);
    expect(wrapper.text()).to.contain('...is empty.');
    expect(wrapper.find('li')).to.have.length(0);
  });

  it("should create cartItems", function() {
    const cart = [{
        id: 'cartItem1',
        count: 2,
        price: 123.45,
    },{
        id: 'cartItem2',
        count: 3,
        price: 125.45,
    }];
    const wrapper = shallow(<Cart cart={cart} />);
    expect(wrapper.find('li')).to.have.length(2);
  });
});