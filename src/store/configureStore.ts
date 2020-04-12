import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import configs from '../configs';

const persistConfig = {
    key: configs.appName,
    storage,
    whitelist: ['account'] // only navigation will be persisted
};


const persistedReducer = persistReducer(persistConfig, reducers);


const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
    )
);
const persistor = persistStore(store);

export { store, persistor }
