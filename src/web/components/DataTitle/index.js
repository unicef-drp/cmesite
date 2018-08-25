import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getTitle } from '../../selectors/data';
import Component from './component';

export default compose(connect(createStructuredSelector({ title: getTitle })))(
  Component,
);
