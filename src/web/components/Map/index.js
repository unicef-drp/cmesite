import { prop } from 'ramda';
import { createStructuredSelector } from 'reselect';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMapSerie } from '../../selectors/data';
import { changeSelection, changeActiveTab } from '../../ducks/data';
import Component from './component';
import { COUNTRY } from '../../api/sdmx';
import { REF_AREA } from '../../constants';

const enhance = compose(
  withRouter,
  connect(createStructuredSelector({ mapSerie: getMapSerie }), {
    changeSelection: changeSelection({ dataType: COUNTRY, selectionType: 'select' }),
    changeActiveTab,
  }),
  withHandlers({
    handleMapClick: ({ changeSelection, history, changeActiveTab }) => datapoint => {
      changeActiveTab(0, true);
      const { index, valueIndex, valueName } = prop(REF_AREA, datapoint);
      history.push(`/data/${valueName}`);
      changeSelection(index, valueIndex);
    },
  }),
);

export default enhance(Component);
