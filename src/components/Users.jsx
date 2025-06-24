import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      joinDate: "2023-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "active",
      joinDate: "2023-02-15",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      status: "blocked",
      joinDate: "2023-03-20",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Slide direction="down">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
      </Slide>

      <Fade>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </Fade>

      <Fade cascade>
        <table className="w-full border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Join Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td
                    className={`py-2 px-4 capitalize ${
                      user.status === "blocked"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="py-2 px-4">{user.joinDate}</td>
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
      </Fade>
    </div>
  );
};

export default Users;
