import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isNil } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { getCountryNotes } from '../../selectors/data';
import Component from './component';

export default compose(
  connect(createStructuredSelector({ note: getCountryNotes })),
  branch(({ note }) => isNil(note), renderNothing),
)(Component);
