import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render } from 'enzyme';
chai.use(spies);

import Price from './Price';

describe("<Price />", function() {
	it("to display proper formatted price", function() {
		const wrapper = shallow(<Price price={123.45}/>);
		expect(wrapper.text()).to.equal('$123.45');
	});
});