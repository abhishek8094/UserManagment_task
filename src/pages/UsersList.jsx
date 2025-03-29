import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, page, totalPages } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers(page));
  }, [dispatch, page]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users List</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-lg">
            <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mx-auto" />
            <h2 className="text-center">{user.first_name} {user.last_name}</h2>
            <button className="bg-red-500 text-white w-full mt-2 p-1 rounded" onClick={() => dispatch(removeUser(user.id))}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
