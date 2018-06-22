import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import component from './component';

const enhance = compose(injectIntl, withRouter);
export default enhance(component);
