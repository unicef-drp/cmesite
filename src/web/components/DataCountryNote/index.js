import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isEmpty } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { getCountryNotes } from '../../selectors/data';
import Component from './component';

export default compose(
  connect(createStructuredSelector({ notes: getCountryNotes })),
  branch(({ notes }) => isEmpty(notes), renderNothing),
)(Component);
