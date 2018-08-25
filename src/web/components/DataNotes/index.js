import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getNotes } from '../../selectors/data';
import Component from './component';

export default compose(connect(createStructuredSelector({ notes: getNotes })))(
  Component,
);
