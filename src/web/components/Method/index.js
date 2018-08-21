import { isEmpty } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getMethod } from '../../selectors/wp';
import Component from './component';

export const mapStateToProps = createStructuredSelector({
  method: getMethod,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  branch(({ method }) => isEmpty(method), renderNothing),
);

export default enhance(Component);
