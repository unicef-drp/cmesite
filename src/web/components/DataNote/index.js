import { connect } from 'react-redux';
import { isNil } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { getDatanote } from '../../selectors/wp';
import Component from './component';

export default compose(
  connect((state, ownProps) => ({
    note: getDatanote(ownProps.dataType)(state),
  })),
  branch(({ note }) => isNil(note), renderNothing),
)(Component);
