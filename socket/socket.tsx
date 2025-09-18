// frontend/components/socket/SocketProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "./socket";
import axios from "axios";

const SocketContext = createContext<{ socket: any } | null>(null);
export const useSocket = () => useContext(SocketContext as any);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    let s: any = null;
    let mounted = true;

    const initSocket = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.warn("SocketProvider: no access token in localStorage");
          return;
        }

        // Make axios include token for subsequent REST calls
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        // Optionally: axios.defaults.withCredentials = true;

        // Get minimal user info for client-side (optional, but handy)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        // backend may return user under res.data.user or res.data
        const userObj = res.data?.user || res.data;
        const userId = userObj?._id || userObj?.id;
        const role = userObj?.role;

        // create socket with token + optional userId/role
        s = getSocket(accessToken, userId, role);
        if (!mounted || !s) return;
        setSocket(s);

        // handler reference so we can remove at cleanup
        const handleIncoming = (notif: any) => {
          console.log("SocketProvider received notification:", notif);
          // TODO: dispatch to toast / global notification store
        };

        if (s && typeof s.on === "function") {
          s.on("new-notification", handleIncoming);
          s.on("notification", handleIncoming);
        }
      } catch (err) {
        console.error("SocketProvider: failed to init socket", err);
      }
    };

    initSocket();

    return () => {
      mounted = false;
      if (s && typeof s.off === "function") {
        s.off("new-notification");
        s.off("notification");
      }
      // don't force disconnect here if other app parts reuse socket, but you can:
      // if (s) s.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
