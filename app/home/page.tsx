'use client'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaBell } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { Input } from '@/components/ui/input';
import { useSocket } from '../../socket/socket';
import axios from 'axios';

const page = () => {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("notification");

  useEffect(() => {
    let mounted = true;
    const fetchNotifications = async () => {
      try {
        // read token at call time (client-only)
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const base = process.env.NEXT_PUBLIC_ORIGIN_URL || '';
        const headers: any = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await axios.get(`${base}/api/notification/me`, { headers });
        if (!mounted) return;

        // Expecting response.data.notifications (per your server handler)
        const list = response?.data?.notifications || [];
        setNotifications(list);
      } catch (error) {
        console.error('fetchNotifications error', error);
      }
    };
    fetchNotifications();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // handler normalizes incoming payloads to match stored notification objects
    const handleNew = (payload: any) => {
      // normalize id (server may send notificationId)
      const incomingId = payload.notificationId ?? payload.id ?? payload._id ?? String(Math.random());
      const incoming = {
        id: incomingId,
        title: payload.title,
        content: payload.content,
        html: payload.html,
        department: payload.department ?? payload.from?.department ?? undefined,
        from: payload.from,
        createdAt: payload.createdAt ?? new Date().toISOString(),
        status: payload.status,
      };

      setNotifications((prevNotifications) => {
        // dedupe by id (check multiple possible id fields)
        const existsIndex = prevNotifications.findIndex(n => {
          const nid = n.id ?? n._id ?? n.notificationId;
          return String(nid) === String(incomingId);
        });

        if (existsIndex !== -1) {
          // update existing item (shallow merge) and keep its position
          const copy = [...prevNotifications];
          copy[existsIndex] = { ...copy[existsIndex], ...incoming };
          return copy;
        }

        // prepend new notification
        return [incoming, ...prevNotifications];
      });
    };

    socket.on('notification:new', handleNew);

    // cleanup to prevent duplicate handlers on re-render / reconnect
    return () => {
      socket.off('notification:new', handleNew);
    };
  }, [socket]);

  return (
    <div>
      {/* landing */}
      <section className='flex pb-28 flex-col justify-center items-center text-center w-full my-5'>
        {/* <div className=''>Welcome to</div> */}
        <div className='flex w-full max-w-sm h-[360px] overflow-clip justify-center items-center /bg-red-600'>
          <img src="Logo.png" alt="EngrConnect Logo" className="h-[420px]" />
        </div>
        <div className="flex flex-col text-primary/90 font-bold text-2xl p-2 text-center max-w-sm w-full">
          <div className='m-2 animate-pulse text-accent'>Stay connected with your faculty.</div>
          <div className='text-sm'>
            Get instant notifications about classes,
            deadlines, events and important announcement.
          </div>
        </div>
        <div className='flex flex-row gap-2 px-1 text-xl font-bold'>
          <div className="flex-1 bg-accent rounded-full px-3">Real-time notifications</div>
          <div className="flex-1  bg-accent rounded-full  px-3">Department filtering</div>
          <div className="flex-1  bg-accent rounded-full  px-3">Offline archive</div>
        </div>
      </section>
      <div className="text-4xl w-full text-center font-bold my-12">Dashboard</div>
      {/* notification */}
      <section className='flex flex-col mx-1 my-3 gap-3'>
        <div className='flex flex-col shadow-md p-2 bg-secondary'>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col flex-1'>
              <div className='text-xl font-semibold'>Total Notification</div>
              <div className='text-5xl font-bold text-accent'>4</div>
              <div className='text-xs'>This week</div>
            </div>
            <div className='flex justify-center items-center rounded-lg text-3xl text-center bg-accent w-16 h-16'><FaBell /></div>
          </div>
          <div className='font-bold text-xl'>12%</div>
        </div>
        <div className='flex flex-col shadow-md p-2 bg-secondary'>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col flex-1'>
              <div className='text-xl font-semibold'>Total Notification</div>
              <div className='text-5xl font-bold text-accent'>4</div>
              <div className='text-xs'>This week</div>
            </div>
            <div className='flex justify-center items-center rounded-lg text-3xl text-center bg-accent w-16 h-16'><FaBell /></div>
          </div>
          <div className='font-bold text-xl'>12%</div>
        </div>
        <div className='flex flex-col shadow-md p-2 bg-secondary'>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col flex-1'>
              <div className='text-xl font-semibold'>Total Notification</div>
              <div className='text-5xl font-bold text-accent'>4</div>
              <div className='text-xs'>This week</div>
            </div>
            <div className='flex justify-center items-center rounded-lg text-3xl text-center bg-accent w-16 h-16'><FaBell /></div>
          </div>
          <div className='font-bold text-xl'>12%</div>
        </div>
      </section>
      {/* notification */}
      <section className='flex flex-col mx-1 my-3 gap-3'>
        {notifications.map((notification) => (
          <div
            key={notification.id ?? notification._id ?? notification.notificationId}
            className="flex flex-col shadow-md px-1 p-2 rounded-sm border-2 border-secondary"
          >
            <div className="flex flex-row">
              <div className="flex flex-1 text-accent font-bold text-lg">{notification.title}</div>
              <div className='bg-secondary w-10 rounded-sm text-center text-accent font-bold text-lg px-2'>
                {notification.department ?? notification.from?.department ?? notification.from?.role ?? '---'}
              </div>
            </div>
            <div>
              {notification.content}
            </div>
            <div className='text-xs'>{new Date(notification.createdAt ?? Date.now()).toLocaleString()}</div>
          </div>
        ))}
      </section>
      {/* tabs and filter */}
      <section className='my-14'>
        <Tabs defaultValue="notification" className="flex flex-col lg:flex-row gap-[60px] mt-5">
          <TabsList className="flex bg-secondary p-2 flex-row lg:flex-col w-full max-w-sm lg:max-w-[280px] xl:max-w-[340px] max-h-[300px] mx-auto xl:mx-0 gap-2 lg:gap-6 ">
            <TabsTrigger value="notification" className='rounded-lg flex-1 bg-background'>Notifications</TabsTrigger>
            <TabsTrigger value="department" className='rounded-lg flex-1 bg-background'>Departments</TabsTrigger>
            <TabsTrigger value="filter" className='rounded-lg flex-1 bg-background'>Filter</TabsTrigger>
          </TabsList>
          <ScrollArea className="lg:h-[80vh] w-full">
            <TabsContent value="notification" className="w-full">
              <NotificationTab />
            </TabsContent>
            <TabsContent value="department" className="w-full">
              <DepartmentTab />
            </TabsContent>
            <TabsContent value="filter" className="w-full">
              <FilterTab />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </section>
      <section className='flex flex-col mx-1 p-2 bg-secondary'>
        <div className='grid grid-cols-2 gap-2 md:gap-5 w-full max-w-[580px] my-5 px-2'>
          <div className='flex w-full justify-center items-center bg-accent rounded-md py-5 flex-col gap-3'>
            <div className='text-2xl'><FaBell /></div>
            <div>All notifications</div>
          </div>
          <div className='flex w-full justify-center items-center bg-accent rounded-md py-5 flex-col gap-3'>
            <div className='text-2xl'><FaBell /></div>
            <div>All notifications</div>
          </div>
          <div className='flex w-full justify-center items-center bg-accent rounded-md py-5 flex-col gap-3'>
            <div className='text-2xl'><FaBell /></div>
            <div>All notifications</div>
          </div>
          <div className='flex w-full justify-center items-center bg-accent rounded-md py-5 flex-col gap-3'>
            <div className='text-2xl'><FaBell /></div>
            <div>All notifications</div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 items-center'>
          <Button className='w-full mx-2'>+ Create Notification</Button>
          <div className='text-center text-xs text-primary/80'>faculty members onle</div>
        </div>
      </section>
      <section className='flex flex-col items-center m-2 p-5 text-center gap-3 border-2 border-secondary my-14'>
        <div className='text-3xl'><FaBell /></div>
        <div className='font-bold text-xl'>Stay Updated</div>
        <div>Enable browser notifications to never miss important updates from your faculty</div>
        <Button onClick={async () => {
          if (typeof window === 'undefined' || !('Notification' in window)) {
            alert('This browser does not support notifications');
            return;
          }
          try {
            const perm = await Notification.requestPermission();
            if (perm === 'granted') new Notification('Notifications enabled', { body: 'You will now receive live updates.' });
          } catch (err) {
            console.error('Notification permission error', err);
          }
        }}>Enable Notifications</Button>
      </section>
    </div>
  )
}

export default page

const NotificationTab = () => {
  return (
    <div className='flex flex-col gap-2 p-1'>
      <div className="flex flex-col shadow-md px-1 p-2 rounded-sm border-2 border-secondary">
        <div className="flex flex-row">
          <div className="flex flex-1 text-accent font-bold text-lg">Software Engineering Lab Cancelled</div>
          <div className='bg-secondary w-10 rounded-sm text-center text-accent font-bold text-lg px-2'>CPE</div>
        </div>
        <div>
          Tommorow SE lab session has been cancelled due to system maintenance.
        </div>
        <div className='text-xs'>about 2 hours ago</div>
      </div>
    </div>
  );
};

const DepartmentTab = () => {
  return (
    <div className='flex flex-col gap-2 p-y'>
      <div className="flex flex-col shadow-md px-1 py-2 rounded-sm border-2 border-secondary">
        <div className="flex flex-row">
          <div className="flex flex-col flex-1 text-accent font-bold text-lg">
            <div>Computer Engineering</div>
            <div className='bg-secondary w-10 rounded-sm text-center text-accent font-bold text-xs px-2'>CPE</div>
          </div>
          <div className='text-xl'><CiBookmarkCheck /></div>
        </div>
        <div className='flex text-xs gap-3'>
          <div>189 students</div>
          <div className='bg-secondary w-20 rounded-sm text-center text-accent font-bold text-xs px-2'>1 new</div>
        </div>
        <div className='w-full flex justify-center my-2'><Button className='w-full max-w-sm'>Subscribe</Button></div>
      </div>
      <div className="flex flex-col shadow-md px-1 py-2 rounded-sm border-2 border-secondary">
        <div className="flex flex-row">
          <div className="flex flex-col flex-1 text-accent font-bold text-lg">
            <div>Computer Engineering</div>
            <div className='bg-secondary w-10 rounded-sm text-center text-accent font-bold text-xs px-2'>CPE</div>
          </div>
          <div className='text-xl'><CiBookmarkCheck /></div>
        </div>
        <div className='flex text-xs gap-3'>
          <div>189 students</div>
          <div className='bg-secondary w-20 rounded-sm text-center text-accent font-bold text-xs px-2'>1 new</div>
        </div>
        <div className='w-full flex justify-center my-2'><Button className='w-full max-w-sm'>Subscribe</Button></div>
      </div>
    </div>
  );
};

const FilterTab = () => {
  return (
    <div className='px-2 bg-secondary rounded-xl py-5 mx-2'>
      <Input className='my-2'></Input>
      <Button className='w-full text-lg'>Search</Button>
    </div>
  );
};
