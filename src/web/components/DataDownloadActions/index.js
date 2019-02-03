import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Component from './component';
import { getDownload } from '../../selectors/wp';
import { getDownloadingData } from '../../selectors/data';
import { downloadData } from '../../ducks/data';

export const enhance = connect(
  createStructuredSelector({
    downloadingData: getDownloadingData,
    codebook: getDownload('codebook'),
    download: getDownload('all'),
  }),
  { downloadData },
);

export default enhance(Component);
