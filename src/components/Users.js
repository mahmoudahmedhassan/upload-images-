import { React, useEffect, useState } from 'react';
import UploadPhoto from './UploadImg'
import { useSelector } from 'react-redux'

function Users() {
  const users = useSelector(state => state.users);
  console.log(users)

  const usersData = users ? users.map((user, index) => (
    <div key={index} className='uses_info' >
      <div className="user_email">
        <p> <span>Email</span> :{user.users.email}</p>
      </div>
      <div className="user_name">
        <p>  <span>Name</span> :{user.users.firstName} {user.users.lastName}</p>
      </div>
    </div>
  )) : null

  return (
    <div>

      <h1 className='my-4 font-weight-bold .display-4 users_title'> user information </h1>
      
      <div className='userdata'>
        {usersData}
        <UploadPhoto />
      </div>

    </div>
  )
}

export default Users