import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const middlwares = [thunk]

const store = createStore(
    reducers,
    compose(applyMiddleware(...middlwares))
)

export default store;