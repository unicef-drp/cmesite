import { isEmpty } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getReports } from '../../selectors/wp';
import Component from './component';

export const mapStateToProps = createStructuredSelector({
  reports: getReports,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  branch(({ reports }) => isEmpty(reports), renderNothing),
);

export default enhance(Component);
