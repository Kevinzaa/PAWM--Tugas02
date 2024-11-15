"use client";
import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, PlusCircleIcon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';

function SideBanner({ onAssignmentCountUpdate }) {
    const { user } = useUser();
    const [date, setDate] = useState(new Date());
    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (user) fetchAssignments();
    }, [user]);

    const fetchAssignments = async () => {
        try {
            const response = await GlobalApi.getAllTask();
            setAssignments(response.taskManagers);
            onAssignmentCountUpdate(response.taskManagers.length); 
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const addAssignment = async () => {
        if (newAssignment.title && newAssignment.dueDate) {
            setIsLoading(true);
            try {
                const formattedDueDate = new Date(newAssignment.dueDate).toISOString();
                await GlobalApi.createTask(newAssignment.title, formattedDueDate);
                fetchAssignments(); 
                setNewAssignment({ title: '', dueDate: '' });
            } catch (error) {
                console.error('Error adding assignment:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error('Title or due date is missing');
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl shadow-lg h-screen overflow-auto text-white">
            {/* Date and Time*/}
            <div className="flex items-center gap-3 mb-8">
                <CalendarIcon className="text-white w-6 h-6" />
                <div>
                    <h3 className="text-base font-semibold">{date.toLocaleDateString()}</h3>
                    <p className="text-sm text-indigo-200">
                        <ClockIcon className="inline-block w-5 h-5 mr-1" />
                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>

            <div className="bg-indigo-50 bg-opacity-20 p-4 rounded-lg mb-8 shadow-inner">
                <p className="text-sm italic">"Jika kamu tidak sanggup menahan lelahnya belajar, maka kamu harus sanggup menahan perihnya kebodohan."</p>
                <p className="text-xs mt-2 text-right">- Imam Syafii</p>
            </div>

            {/* New Assignment Input (user)*/}
            {user ? (
                <>
                    <div className="flex flex-col gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Assignment Title"
                            value={newAssignment.title}
                            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                            className="border border-indigo-300 bg-transparent rounded p-2 text-sm placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        <input
                            type="date"
                            value={newAssignment.dueDate}
                            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                            className="border border-indigo-300 bg-transparent rounded p-2 text-sm placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                        <button
                            onClick={addAssignment}
                            className="p-2 mt-2 text-indigo-300 hover:text-white transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? "Adding..." : <PlusCircleIcon className="w-6 h-6 mx-auto" />}
                        </button>
                    </div>

                    {/* Assignments */}
                    <ul className="space-y-3">
                        {assignments.map((assignment) => (
                            <li key={assignment.id} className="flex items-center justify-between p-3 rounded-lg bg-indigo-700 bg-opacity-50 hover:bg-opacity-80 transition-all">
                                <div className="text-sm">
                                    <h5 className="font-semibold">{assignment.judul}</h5>
                                    <p className="text-xs text-indigo-200">Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                // Guest
                <div className="space-y-3">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-full h-10 rounded-lg bg-indigo-300 bg-opacity-30 animate-pulse"></div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SideBanner;
