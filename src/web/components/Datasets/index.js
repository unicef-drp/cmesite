import { isEmpty } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getDatasets, getDatasetsUpdatedAt } from '../../selectors/wp';
import Component from './component';

export const mapStateToProps = createStructuredSelector({
  datasets: getDatasets,
  updatedAt: getDatasetsUpdatedAt,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  branch(({ datasets }) => isEmpty(datasets), renderNothing),
);

export default enhance(Component);
