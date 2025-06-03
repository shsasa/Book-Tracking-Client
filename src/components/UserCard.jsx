const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
      <p>Updated At: {new Date(user.updatedAt).toLocaleDateString()}</p>
    </div>
  )
}

export default UserCard