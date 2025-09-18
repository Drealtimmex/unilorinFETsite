// frontend/components/socket/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * getSocket
 * token: optional JWT
 * userId/role: optional metadata for handshake
 */
export const getSocket = (token?: string | null, userId?: string | null, role?: string | null): Socket | null => {
  if (!socket) {
    const accessToken = token || (typeof window !== "undefined" ? localStorage.getItem("accessToken") : null);
    if (!accessToken) {
      console.warn("getSocket: no access token available");
      return null;
    }

    socket = io(process.env.NEXT_PUBLIC_ORIGIN_URL as string, {
      auth: { token: accessToken, userId, role },
      transports: ["websocket"],
      autoConnect: false,
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
export type MaybeSocket = Socket | null;
