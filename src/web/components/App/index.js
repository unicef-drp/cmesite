import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { setConfig, hot } from 'react-hot-loader';
import component from './component';

setConfig({ logLevel: 'debug' });

const enhance = compose(injectIntl, withRouter);

export default hot(module)(enhance(component));
