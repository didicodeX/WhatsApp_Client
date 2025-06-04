import { useEffect } from "react";
import { socket } from "./socket";

export function useSocketEvents({ setNamespaces, setRooms, setMessages }) {
  useEffect(() => {
    socket.connect();

    // Écoute des événements du serveur

    socket.on("namespaces", setNamespaces);
    socket.on("rooms", setRooms);
    socket.on("roomMessages", setMessages);
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    
    return () => {
      socket.off("namespaces", setNamespaces);
      socket.off("rooms", setRooms);
      socket.off("roomMessages", setMessages);
      socket.off("message");
      socket.disconnect();
    };
  }, [setMessages, setNamespaces, setRooms]);
}
