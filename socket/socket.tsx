// frontend/components/socket/SocketProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "./socket.ts";
import axios from "axios";
const SocketContext = createContext<any>(null);
export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    let s: any;
    let mounted = true;

    const initSocket = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { _id, role } = res.data;

          s = getSocket(_id, role);
          if (!mounted) return;
          setSocket(s);

          // single handler reference so we can remove it during cleanup
          const handleIncoming = (notif: any) => {
            console.log("SocketProvider received notif:", notif);
            // bridge to global bus (ToastManager subscribes to this)
            // try {
            //   emitNotification(notif);
            // } catch (err) {
            //   console.warn("emitNotification failed:", err);
            // }
          };

          // attach to both event names just in case
          if (s && typeof s.on === "function") {
            s.on("new-notification", handleIncoming);
            s.on("notification", handleIncoming);
          }
        } else {
          console.error('No access token found in local storage');
        }
      } catch (err) {
        console.error("Failed to init socket", err);
      }
    };

    initSocket();

    return () => {
      mounted = false;
      if (s && typeof s.off === "function") {
        s.off("new-notification");
        s.off("notification");
      }
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
