import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getLocale } from '../../selectors/language';
import component from './component';

export const mapStateToProps = createStructuredSelector({
  locale: getLocale,
});

const enhance = compose(connect(mapStateToProps, null));

export default enhance(component);
