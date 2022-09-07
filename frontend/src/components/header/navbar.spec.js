import React from 'react';
import Navbar from './navbar.component';
import { shallow } from 'enzyme';

it('логотип ELK', () => {
  const wrapper = shallow(<Navbar />);

  expect(wrapper.find('img').prop('src')).toEqual('/img/logo-elk.png');
});
