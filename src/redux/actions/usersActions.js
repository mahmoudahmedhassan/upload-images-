import {GET_USER_DATA,POST_USER_DATA} from './usersTypes';
 
const gitUsersData =(data)=>{
     return {
        type: GET_USER_DATA,
        payload:data
      }        

}
const postUsersData =(data)=>{
     
    return {
        type: POST_USER_DATA,
        payload:data
      }        

}
export{gitUsersData,postUsersData}