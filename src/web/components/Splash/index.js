import { isNil } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getSplash } from '../../selectors/wp';
import Component from './component';

export const mapStateToProps = createStructuredSelector({
  splash: getSplash,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  branch(({ splash }) => isNil(splash), renderNothing),
);

export default enhance(Component);
