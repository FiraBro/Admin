import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { userService } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getAllUser();
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Slide direction="down">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          User Management
        </h2>
      </Slide>

      <Fade>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Fade>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <Fade cascade>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-sm text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 text-left whitespace-nowrap">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left whitespace-nowrap">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left whitespace-nowrap">
                    Role
                  </th>
                  <th className="py-2 px-4 text-left whitespace-nowrap">
                    Join Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4">{user.fullName}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4 capitalize">{user.role}</td>
                      <td className="py-2 px-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Users;
