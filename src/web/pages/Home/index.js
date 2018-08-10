import { compose, lifecycle } from 'recompose';
import component from './component';

export function componentDidMount() {
  // Analytics.trackEvent();
}

export const enhance = compose(lifecycle({ componentDidMount }));

export default enhance(component);
