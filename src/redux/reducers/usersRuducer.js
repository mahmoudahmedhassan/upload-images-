import { GET_USER_DATA, POST_USER_DATA } from '../actions/usersTypes.js';

// let users = [];
let initialValues ={
    users: [],
 }
const UserDetails = (state = initialValues.users , action) => {

    switch (action.type) {
        case GET_USER_DATA:
            return [
                ...state,
                {
                    users: action.payload
                },
 
            ]
        default:
            return state
    }
}

export default UserDetails;