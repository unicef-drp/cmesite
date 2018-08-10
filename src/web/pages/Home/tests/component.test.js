import React from 'react';
import { shallow } from 'enzyme';
import Component from '../component';

const props = {
  posts: [{ id: 1, content: { rendered: 'rendered' } }],
};

describe('app | pages | LandingPage | component', () => {
  describe('render', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<Component {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
