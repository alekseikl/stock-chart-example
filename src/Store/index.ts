import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';

const composeEnhancers = composeWithDevTools({
  serialize: true
});

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));