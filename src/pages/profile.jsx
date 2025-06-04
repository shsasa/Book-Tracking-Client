const Profile = ({ user }) => {
  return (
    <div>
      <h1>{user.name}'s Profile</h1>

      <p>Email: {user.email}</p>
    </div>
  )
}

export default Profile
