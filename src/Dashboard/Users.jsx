import React from "react";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@mail.com" },
    { id: 2, name: "Jane Smith", email: "jane@mail.com" },
  ];

  return (
    <div>
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
