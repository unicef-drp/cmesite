import { compose, shouldUpdate } from 'recompose';
import Component from './component';

export default compose(shouldUpdate(nextProps => nextProps.activeTab === 2))(
  Component,
);
