import React from 'react';
import { shallow } from 'enzyme';
import Component from '../component';

describe('Footer | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const root = <Component />;

      const wrapper = shallow(root);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
