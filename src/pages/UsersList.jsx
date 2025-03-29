import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice"; 
import ReactPaginate from "react-paginate";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const offset = currentPage * usersPerPage;
  const currentUsers = users?.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(users?.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditUserData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleInputChange = (e) => {
    setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = (id) => {
    dispatch(updateUser({ id, ...editUserData }));
    setEditUserId(null); 
  };

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

                {editUserId === user.id ? (
                  <>
                    <td className="py-2 px-4 border">
                      <input
                        type="text"
                        name="first_name"
                        value={editUserData.first_name}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={editUserData.last_name}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full mt-1"
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="email"
                        name="email"
                        value={editUserData.email}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleUpdateClick(user.id)}>
                        Update
                      </button>
                      <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setEditUserId(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border">{user.first_name} {user.last_name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEditClick(user)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => dispatch(removeUser(user.id))}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
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
    </div>
  );
};

export default UsersList;
