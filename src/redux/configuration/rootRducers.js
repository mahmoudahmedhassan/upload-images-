import UserDetails from '../reducers/usersRuducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
 users: UserDetails,
 });

export default rootReducer;
