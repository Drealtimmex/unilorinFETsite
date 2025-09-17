'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'

const page = () => {
  const [formData, setFormData] = useState({
    role: '',
    level: '',
  });

  const [notificationData, setNotificationData] = useState({
    title: '',
    content: '',
    department: '',
     scheduledAt: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    if (storedUser && accessToken) {
      const userData = JSON.parse(storedUser);
      const userId = userData._id;
      const response = await axios.put(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/users/${userId}`, {
        role: formData.role,
        level: formData.level,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        alert('User role updated successfully!');
      }
    } else {
      console.error('No user data found in local storage');
    }
  } catch (error) {
    console.error(error);
  }
};



const handleNotificationChange = (e) => {
  setNotificationData({ ...notificationData, [e.target.name]: e.target.value });
};

const handleNotificationSubmit = async (e) => {
  e.preventDefault();
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/notification`, {
      title: notificationData.title,
      content: notificationData.content,
      target: {
        departments: [notificationData.department],
      },
      scheduledAt: notificationData. scheduledAt,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 201) {
      alert('Notification posted successfully!');
    }
  } catch (error) {
    console.error(error);
  }
};

  
  return (
    <main className="">

      {/* admin panel */}
      <div
        className="flex flex-col gap-2 items-center my-5 p-4 rounded-lg bg-secondary shadow-md mx-2"
      >
        <h2 className="text-xl text-accent mb-2 font-bold">Admin Panel</h2>

        <div className="mb-4 pb-4 border-bottom w-full">
          <div className="text-xl font-bold fw-bold">Switch Admin Role</div>
          <div className="flex flex-col gap-2 w-full mb-2">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg h-10 font-semibold"
              >
                <option value="HOD">HOD</option>
                <option value="Level Adviser">Level Adviser</option>
                <option value="Faculty Officer">Faculty Officer</option>
                <option value="Dean">Dean</option>
                <option value="Sub-Dean">Sub-Dean</option>
                <option value="Faculty President">Faculty President</option>
                <option value="Faculty PRO">Faculty PRO</option>
                <option value="Lecturer">Lecturer</option>
              </select>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-lg h-10 font-semibold"
              >
                <option value="All">All Levels</option>
                <option value="100">100-level</option>
                <option value="200">200-level</option>
                <option value="300">300-level</option>
                <option value="400">400-level</option>
                <option value="500">500-level</option>
              </select>
          </div>
          <Button onClick={handleSubmit} className="w-full text-lg font-semibold">
            Update Role
          </Button>
        </div>




        <div className="text-xl font-bold">Post New Notification</div>
        <form className='w-full gap-2' onSubmit={handleNotificationSubmit}>
          <div className="flex justify-center items-center gap-2 w-full">
            <Label className="font-semibold text-xl">Title</Label> 
            <Input
              type="text"
              name="title"
              value={notificationData.title}
              onChange={handleNotificationChange}
              className="flex-1"
              placeholder="e.g., Test Tomorrow"
            />
          </div>
          <div className="flex justify-center  mt-2 items-center gap-2 w-full">
            <label className="font-semibold text-xl">Body</label>
            <textarea
              name="content"
              value={notificationData.content}
              onChange={handleNotificationChange}
              className="h-24 flex-1"
              id="postBody"
              placeholder="e.g., Thermodynamics class is cancelled today."
            ></textarea>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <label className="font-semibold text-xl text-start w-full">Department</label>
            <select
              name="department"
              value={notificationData.department}
              onChange={handleNotificationChange}
              className="w-full rounded-lg h-10 font-semibold"
            >
              <option value="All Department">All Department</option>
              <option value="Agricultural and Bio Systems Engineering">
                Agricultural and Bio Systems Engineering
              </option>
              <option value="Water Resources and Environmental Engineering">
                Water Resources and Environmental Engineering
              </option>
              <option value="Chemical Engineering">
                Chemical Engineering
              </option>
              <option value="Food Engineering">Food Engineering</option>
              <option value="Computer Engineering">
                Computer Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Biomedical Engineering">
                Biomedical Engineering
              </option>
              <option value="Material and Metallurgical Engineering">
                Material and Metallurgical Engineering
              </option>
            </select>
          </div>
          <div className="mt-2 gap-2">
            <label className="text-lg font-semibold">
              Expiration Date
            </label>
            <Input
              type="date"
              name=" scheduledAt"
              value={notificationData. scheduledAt}
              onChange={handleNotificationChange}
              className="form-control"
              id="post scheduledAt"
            />
          </div>
          <Button type="submit" className="w-full mt-2 text-lg font-semibold">
            Post Notification
          </Button>
        </form>
      </div>



      {/* available admin account notification */}
      <div id="notificationList">
        <div className="text-center text-muted p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading notifications...</p>
        </div>
      </div>
    </main>
  )
}

export default page
