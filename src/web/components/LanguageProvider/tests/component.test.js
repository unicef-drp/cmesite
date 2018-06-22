import React from 'react';
import { shallow } from 'enzyme';
import Component from '../component';

const props = {
  messages: {},
  locale: 'en',
};

describe('app | App | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const root = (
        <Component {...props}>
          <div />
        </Component>
      );

      const wrapper = shallow(root);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
