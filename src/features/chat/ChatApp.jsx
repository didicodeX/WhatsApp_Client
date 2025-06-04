import { useState } from "react";
import { socket } from "@/socket/socket";
import { useSocketEvents } from "@/socket/useSocketEvent";

export default function ChatApp() {
  const [namespaces, setNamespaces] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useSocketEvents({ setNamespaces, setRooms, setMessages });


  const handleNamespaceClick = (id) => {
    socket.emit("joinNamespace", id);
  };

  const handleRoomClick = (id) => {
    setSelectedRoom(id);
    socket.emit("joinRoom", id);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!selectedRoom) {
    alert("⚠️ Veuillez d’abord rejoindre une room");
    return;
  }
    const input = e.target.message;
    console.log("Sending message:", input.value);
    
    const content = input.value.trim();
    if (!content) return;

    socket.emit("newMessage", {
      room: selectedRoom,
      content,
      author: "683e169d4a2883df72284a56", // à remplacer par user ID réel
      authorName: "Dylane",
    });

    input.value = "";
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="p-4 border-r">
        <h2 className="text-xl mb-2">Namespaces</h2>
        {namespaces.map((ns) => (
          <div key={ns._id} onClick={() => handleNamespaceClick(ns._id)}>
            {ns.name}
          </div>
        ))}
      </div>

      <div className="p-4 border-r">
        <h2 className="text-xl mb-2">Rooms</h2>
        {rooms.map((room) => (
          <div key={room._id} onClick={() => handleRoomClick(room._id)}>
            {room.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col p-4">
        <h2 className="text-xl mb-2">Messages</h2>
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <div key={i} className="mb-1">
              <strong>{msg.authorName}</strong>: {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex">
          <input
            name="message"
            className="border rounded w-full mr-2 px-2 py-1"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
