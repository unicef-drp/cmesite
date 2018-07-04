import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import serializer from 'enzyme-to-json/serializer';
require('babel-core').transform('code', { plugins: ['dynamic-import-node'] });

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);
