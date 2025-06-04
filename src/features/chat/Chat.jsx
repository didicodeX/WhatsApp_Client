import { useState } from "react";

function Chat({ user }) {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO : add message
  }

  return (
    <div className="bg-white border rounded shadow flex flex-col h-full">
      <div className="bg-gray-100 p-4">
        <h2 className="text-lg font-bold">{user.name}</h2>
      </div>
      <div className="flex-1 p-4">
        <div className="h-full bg-gray-200 rounded overflow-y-auto"></div>
      </div>
      <form className="bg-gray-100 p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`Message ${user.name}...`}
          className="bg-white border rounded-full w-full py-2 px-4"
        />
      </form>
    </div>
  );
}

function App({ users }) {
  const [activeUser, setActiveUser] = useState(users[0]);

  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 p-4 flex-1">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setActiveUser(user)}
            className={`mb-4 w-full py-2 px-4 rounded-lg ${
              activeUser.id === user.id ? "bg-blue-500 text-white" : ""
            }`}
          >
            {user.name}
          </button>
        ))}
      </div>
      <div className="p-4 flex-[2]">
        <Chat key={activeUser.name} user={activeUser} />
      </div>
    </div>
  );
}

export default function MyChatApp() {
  const users = [
    { id: 1, name: "Nicolas" },
    { id: 2, name: "Ana" },
    { id: 3, name: "Melvyn" },
  ];

  return <App users={users} />;
}
