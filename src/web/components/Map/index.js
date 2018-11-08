import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getMapSerie } from '../../selectors/data';
import Component from './component';

const enhance = connect(
  createStructuredSelector({
    mapSerie: getMapSerie,
  }),
);

export default enhance(Component);
