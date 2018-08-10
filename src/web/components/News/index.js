import { isEmpty } from 'ramda';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getNews } from '../../selectors/wp';
import Component from './component';

export const mapStateToProps = createStructuredSelector({
  news: getNews,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  branch(({ news }) => isEmpty(news), renderNothing),
);

export default enhance(Component);
