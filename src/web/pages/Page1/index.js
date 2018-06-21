import { compose, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { getLocale } from '../../selectors/language';
import component from './component';

export function componentDidMount() {
  // Analytics.trackEvent(EVENTS.get(PW_WEBAPP_TERMS_CONDITIONS));
}

export const mapStateToProps = createStructuredSelector({
  locale: getLocale,
});

export const enhance = compose(
  connect(mapStateToProps, null),
  lifecycle({
    componentDidMount,
  }),
);

export default enhance(component);
