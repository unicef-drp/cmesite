import { prop, findIndex, propEq } from 'ramda';
import { createStructuredSelector } from 'reselect';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMapSerie, getCountryDimension } from '../../selectors/data';
import { changeSelection, changeActiveTab } from '../../ducks/data';
import Component from './component';
import { COUNTRY } from '../../api/sdmx';
import { REF_AREA } from '../../constants';

const enhance = compose(
  withRouter,
  connect(createStructuredSelector({ mapSerie: getMapSerie, dimension: getCountryDimension }), {
    changeSelection: changeSelection({
      dataType: COUNTRY,
      selectionType: 'select',
      shouldNotGetData: true,
    }),
    changeActiveTab,
  }),
  withHandlers({
    handleMapClick: ({ changeSelection, history, changeActiveTab, dimension }) => datapoint => {
      changeActiveTab(0, true);
      const { index, valueName, valueId } = prop(REF_AREA, datapoint);
      history.push(`/data/${valueName}`);
      changeSelection(index, findIndex(propEq('id', valueId), dimension.values));
    },
  }),
);

export default enhance(Component);
