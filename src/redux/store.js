import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import userReducer, {restoreSessionAction} from './userDuck'
import charsReducer, {getCharactersAction, restoreFavsAction} from './charsDuck'
import thunk from 'redux-thunk'


let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer
    
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    let store = createStore(rootReducer,
                composeEnhancers(applyMiddleware(thunk)))
    
    getCharactersAction()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch)
    restoreFavsAction()(store.dispatch)
    
    return store 
}