import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //Es fundametal para las operaciones asincronas con axios o fetch
import rootReducer from '../Reducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));