import React from 'react';
import { shallow } from 'enzyme';
import Component from '../component';

const props = {
  messages: {},
  locale: 'en',
  routes: [{ name: 1 }],
};

describe('Header | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const root = <Component {...props} />;

      const wrapper = shallow(root);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
