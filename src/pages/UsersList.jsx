import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers , updateUser, removeUser} from "../redux/userSlice";
import ReactPaginate from "react-paginate";
import EditUser from "../components/EditUser";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 6;
  const [editingUser, setEditingUser] = useState(null); 

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const offset = currentPage * usersPerPage;
  const currentUsers = users?.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users?.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (id, updatedData) => {
    dispatch(updateUser({ id, ...updatedData }));
    await dispatch(fetchUsers()); 
    setEditingUser(null);
  };

  const handleDeleteClick = (id) =>{
    dispatch(removeUser(id))
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-center">List of Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Avatar</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
              <tr key={user.id} className="text-center border">
                <td className="py-2 px-4 border">
                  <img src={user.avatar} alt={user.first_name} className="w-10 h-10 rounded-full mx-auto" />
                </td>
                <td className="py-2 px-4 border">{user.first_name} {user.last_name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer" onClick={() => handleEditClick(user)}>
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer" onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-4 space-x-2"}
        pageClassName={"border px-3 py-1 rounded cursor-pointer"}
        activeClassName={"bg-blue-500 text-white"}
        previousClassName={"border px-3 py-1 rounded cursor-pointer"}
        nextClassName={"border px-3 py-1 rounded cursor-pointer"}
        breakClassName={"border px-3 py-1 rounded cursor-pointer"}
      />

      {editingUser && (
        <EditUser
          user={editingUser}
          onSave={handleUpdateUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default UsersList;
