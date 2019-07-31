import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import wordpressReducer from 'ducks/wordpress/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    wordpress: wordpressReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
