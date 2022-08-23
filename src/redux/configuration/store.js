
import rootReducer from "./rootRducers";
import {createStore} from 'redux'
const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 const store = createStore(rootReducer,devtools);

export default store;
