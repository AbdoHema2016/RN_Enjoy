import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
const store =  createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
)
export default store;