import { isEmpty } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getMethods } from '../../selectors/wp';
import Component from './component';

export const enhance = compose(
  connect(createStructuredSelector({ methods: getMethods }), null),
  branch(({ methods }) => isEmpty(methods), renderNothing),
);

export default enhance(Component);
