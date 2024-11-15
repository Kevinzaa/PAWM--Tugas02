"use client";

import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, ClipboardListIcon } from 'lucide-react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function MiniDashboard() {
  const { user } = useUser(); 
  const [date, setDate] = useState(new Date());
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();

  const userDetailInformation = () => {
    if (user) {
      GlobalApi.userDetailInformation(courseInfo?.slug, user?.primaryEmailAddress?.emailAddress).then((resp) => {
        console.log(resp);
        if (resp) {
          router.push('/watch-course/' + resp.createUserDetail.id);
        }
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await GlobalApi.getAllTask();
      setAssignments(response.taskManagers);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    if (user) {
        fetchAssignments();
        fetchUserQuizScore();
    }
  }, [user]);

  const fetchUserQuizScore = async () => {
      const response = await GlobalApi.getUserScore(user.email);
      setScore(response.score); 
  };

  const nearestDeadline = assignments.reduce((nearest, current) => {
    const currentDeadline = new Date(current.deadline);
    return !nearest || currentDeadline < new Date(nearest.deadline) ? current : nearest;
  }, null);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="p-6 text-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md text-white">
      {/* Date and Time */}
      <div className="text-2xl font-semibold">
        {dayNames[date.getDay()]}, {monthNames[date.getMonth()]} {date.getDate()}
      </div>
      <div className="text-sm font-light mt-1">
        {date.getFullYear()}
      </div>
      <div className="flex items-center justify-center gap-1 mt-2 text-lg">
        <ClockIcon className="w-5 h-5" />
        <span>
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* To-Do List*/}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-gray-800 text-left">
        <h3 className="font-semibold text-indigo-500 flex items-center gap-2">
          <ClipboardListIcon className="w-5 h-5" /> Upcoming To-Do
        </h3>
        {nearestDeadline ? (
          <div className="mt-3">
            <h4 className="font-bold text-gray-700">{nearestDeadline.judul}</h4>
            <p className="text-sm text-gray-500">
              Due: {new Date(nearestDeadline.deadline).toLocaleDateString()} at {new Date(nearestDeadline.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-3">No upcoming assignments.</p>
        )}
      </div>
    </div>
  );
}

export default MiniDashboard;
