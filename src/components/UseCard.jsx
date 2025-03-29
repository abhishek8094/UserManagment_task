const UserCard = ({ user, onDelete }) => {
    return (
      <div className="border p-4 shadow-md rounded-md">
        <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mx-auto" />
        <h3 className="text-center">{user.first_name} {user.last_name}</h3>
        <button className="bg-red-500 text-white px-4 py-1 mt-2 w-full" onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  };
  
  export default UserCard;
  