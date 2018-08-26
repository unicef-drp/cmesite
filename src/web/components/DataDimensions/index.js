import { isNil, isEmpty, anyPass } from 'ramda';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  getOtherDimensions,
  getIsLoadingStructure,
} from '../../selectors/data';
import { toggleDimensionValue } from '../../ducks/data';
import Component from './component';
import DataProgress from '../DataProgress';

export const mapStateToProps = createStructuredSelector({
  dimensions: getOtherDimensions,
  isLoadingStructure: getIsLoadingStructure,
});

export const mapDispatchToProps = { toggleDimensionValue };

export const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ isLoadingStructure }) => isLoadingStructure,
    renderComponent(DataProgress),
  ),
  branch(
    ({ dimensions }) => anyPass([isNil, isEmpty])(dimensions),
    renderNothing,
  ),
);

export default enhance(Component);
