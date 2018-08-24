import axios from 'axios';
import { prop } from 'ramda';

const CONFIG_PATH = '/params/config.json';
const loadConfig = () => axios.get(CONFIG_PATH).then(prop('data'));
export default loadConfig;
