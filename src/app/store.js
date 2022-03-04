// (1) import module dari `redux`
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import authReducer from '../features/Auth/reducer';
import productsReducer from '../features/Products/reducer';

// (2) import redux-thunk middleware
import thunk from 'redux-thunk';

// (3) buat composer enhancer untuk menghubungkan dengan Chrome DevTools Redux
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// (4) gabung reducer
const rootReducers = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

// (5) buat store, dan gunakan composerEnhancer + middleware thunk
const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

// (6) export store
export default store;
