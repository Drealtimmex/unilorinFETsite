// frontend/components/socket/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * getSocket
 * - token: JWT (prefer passing it explicitly, otherwise read from localStorage)
 * - userId, role: optional extra metadata you may want in the handshake
 *
 * returns Socket | null
 */
export const getSocket = (token?: string | null, userId?: string | null, role?: string | null): Socket | null => {
  if (!socket) {
    const accessToken = token || localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("getSocket: no access token available");
      return null;
    }

    socket = io(process.env.NEXT_PUBLIC_ORIGIN_URL as string, {
      auth: { token: accessToken, userId, role },
      transports: ["websocket"],
      autoConnect: false,
      // if you rely on httpOnly cookie flows you could set withCredentials: true here
    });

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect_error:", err);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    try {
      socket.disconnect();
    } catch (err) {
      console.warn("disconnectSocket error", err);
    }
    socket = null;
  }
};
