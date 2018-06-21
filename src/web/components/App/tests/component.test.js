import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import SpinnerScreen from '../../../components/SpinnerScreen';
import TechnicalErrorModal from '../../../components/ErrorDialog';
import CookieSettings from '../../../components/CookieSettings';
import ROUTES, { allRoutes, getPath } from '../../../routes';
import Component from '../component';

describe('app | containers | App | component', () => {
  // given
  const props = {
    classes: {
      root: {},
      container: {},
    },
    hasTechnicalError: true,
    noContainer: true,
    location: { pathname: getPath(ROUTES.TERM_CONDITION) },
    isFetching: true,
  };

  describe('render', () => {
    it('should be defined', () => {
      // given
      const wrapper = shallow(<Component {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });
    it('should match snapshot', () => {
      // when
      const wrapper = shallow(<Component {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('wrapper', () => {
    it('should have proper className props', () => {});
  });
  describe('SpinnerScreen', () => {
    describe('when application is idle', () => {
      it('should not be rendered', () => {
        // given
        const customProps = {
          ...props,
          isFetching: false,
        };

        const wrapper = shallow(<Component {...customProps} />);
        const spinnerScreen = wrapper.find(SpinnerScreen);

        // then
        expect(spinnerScreen).toHaveLength(0);
      });
    });
    describe('when application is fetching data', () => {
      it('should be rendered', () => {
        // given
        const customProps = {
          ...props,
          isFetching: true,
        };

        const wrapper = shallow(<Component {...customProps} />);
        const spinnerScreen = wrapper.find(SpinnerScreen);

        // then
        expect(spinnerScreen).toHaveLength(1);
      });
    });
  });
  describe('CookieSettings', () => {
    describe('when user is on term and condition route', () => {
      it('should not be rendered', () => {
        // given
        const customProps = {
          ...props,
          location: { pathname: getPath(ROUTES.TERM_CONDITION) },
        };

        const wrapper = shallow(<Component {...customProps} />);
        const spinnerScreen = wrapper.find(CookieSettings);

        // then
        expect(spinnerScreen).toHaveLength(0);
      });
    });
    describe('when user is not on term and condition route', () => {
      it('should be rendered', () => {
        // given
        const customProps = {
          ...props,
          location: { pathname: getPath(ROUTES.WORKFLOW) },
        };

        const wrapper = shallow(<Component {...customProps} />);
        const spinnerScreen = wrapper.find(CookieSettings);

        // then
        expect(spinnerScreen).toHaveLength(1);
      });
    });
  });
  describe('when noContainer is false', () => {
    it('should render the routes', () => {
      // given
      const customProps = {
        ...props,
        noContainer: false,
      };
      const wrapper = shallow(<Component {...customProps} />);
      const routes = wrapper.find(Route);

      // then
      expect(routes).toHaveLength(allRoutes.length + 1);
    });
  });

  describe('when noContainer is true', () => {
    it('should not render the routes', () => {
      // given
      const customProps = {
        ...props,
        noContainer: true,
      };
      const wrapper = shallow(<Component {...customProps} />);
      const routes = wrapper.find(Route);

      // then
      expect(routes).toHaveLength(0);
    });
  });

  describe('when pathname is not term-conditions', () => {
    it('should not render CookieSettings', () => {
      // given
      const customProps = {
        ...props,
        location: {
          pathname: 'fakePathname',
        },
      };
      const wrapper = shallow(<Component {...customProps} />);
      const cookieSettings = wrapper.find(CookieSettings);
      // then
      expect(cookieSettings).toHaveLength(1);
    });
  });

  describe('when the technicalError prop is false', () => {
    it('should not render a TechnicalErrorModal', () => {
      // given
      const customProps = {
        ...props,
        hasTechnicalError: false,
      };
      const wrapper = shallow(<Component {...customProps} />);
      const ErrorDialog = wrapper.find(TechnicalErrorModal);

      // then
      expect(ErrorDialog).toHaveLength(0);
    });
  });

  describe('when hasTechnicalError prop is true', () => {
    it('should render a TechnicalErrorModal', () => {
      // given
      const customProps = {
        ...props,
        hasTechnicalError: true,
      };
      const wrapper = shallow(<Component {...customProps} />);
      const ErrorDialog = wrapper.find(TechnicalErrorModal);

      // then
      expect(ErrorDialog).toHaveLength(1);
    });
  });
});
