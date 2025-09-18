// frontend/components/socket/SocketProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "./socket";
import axios from "axios";
import type { MaybeSocket } from "./socket";

type SocketContextValue = { socket: MaybeSocket };

const SocketContext = createContext<SocketContextValue>({ socket: null });
export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<MaybeSocket>(null);

  useEffect(() => {
    let s: MaybeSocket = null;
    let mounted = true;

    const initSocket = async () => {
      try {
        const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        if (!accessToken) {
          console.warn("SocketProvider: no access token in localStorage");
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // fetch minimal user info (optional)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userObj = res.data?.user || res.data || {};
        const userId = userObj?._id || userObj?.id || null;
        const role = userObj?.role || null;

        s = getSocket(accessToken, userId, role);
        if (!mounted || !s) return;
        setSocket(s);

        const handleIncoming = (notif: any) => {
          console.log("SocketProvider received notification:", notif);
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
      // optionally disconnect:
      // if (s) s.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}
