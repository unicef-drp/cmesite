import { isNil } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getAbout, getFocuses } from '../../selectors/wp';
import Component from './component';

export const mapStateToProps = createStructuredSelector({
  about: getAbout,
  focuses: getFocuses,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  branch(({ about }) => isNil(about), renderNothing),
);

export default enhance(Component);
