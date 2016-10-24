import { createStore, applyMiddleware } from 'redux';
//import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
    const middlewares = [thunk];

    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        //persistedState, # should add in later
        applyMiddleware(...middlewares)
    );
}

export default configureStore;