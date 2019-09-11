import { connect } from 'react-redux';
import Component from './component';
import { downloadTable } from '../../ducks/data';

const enhance = connect(null, { downloadTable });

export default enhance(Component);
