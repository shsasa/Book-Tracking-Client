import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'


const Profile = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h1>'s Profile</h1>

      <p>User:{user.name} </p>
    </div>
  )
}

export default Profile
