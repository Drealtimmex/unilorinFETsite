import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

//s = getSocket(_id, role, accessToken);

export const getSocket = () => {
  if (!socket) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      socket = io(process.env.NEXT_PUBLIC_ORIGIN_URL as string, {
        auth: { token },
        transports: ["websocket"],
        autoConnect: false,
      });

      socket.connect();

      socket.on("connect", () => {
        console.log("Socket connected:", socket?.id);
      });
    } else {
      console.error('No access token found in local storage');
    }
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
