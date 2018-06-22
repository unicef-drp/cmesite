import React from 'react';
import { shallow } from 'enzyme';
import Component from '../component';

describe('app | App | component', () => {
  describe('render', () => {
    it('should be defined', () => {
      const wrapper = shallow(<Component />);
      expect(wrapper).toBeDefined();
    });
    it('should match snapshot', () => {
      const wrapper = shallow(<Component />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
