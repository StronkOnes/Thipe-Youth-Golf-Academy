import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_LESSONS } from '../constants';
import { LessonStatus } from '../types';

const availableTimeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const SchedulingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>(MOCK_STUDENTS[0]?.id || '');
  const [bookings, setBookings] = useState(MOCK_LESSONS);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dateInstance = new Date(year, month, 1);
    const days = [];
    while (dateInstance.getMonth() === month) {
      days.push(new Date(dateInstance));
      dateInstance.setDate(dateInstance.getDate() + 1);
    }
    return days;
  };

  const firstDayOfMonth = selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay() : 0;
  const daysInMonth = selectedDate ? getDaysInMonth(selectedDate) : [];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedStudent) {
      alert("Please select a date, time, and student.");
      return;
    }
    const newBooking = {
      id: `les_${Date.now()}`,
      date: selectedDate.toISOString().split('T')[0],
      timeSlot: selectedTime,
      studentId: selectedStudent,
      coachId: 'user_coach_1', // Mock coach
      status: LessonStatus.Pending,
    };
    setBookings([...bookings, newBooking]);
    setIsBookingConfirmed(true);
    setSelectedTime(null);
  };
  
  const isSlotBooked = (date: Date, time: string) => {
    const dateString = date.toISOString().split('T')[0];
    return bookings.some(b => b.date === dateString && b.timeSlot === time);
  };
  
  return (
    <div className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-tyga-dark dark:text-white sm:text-5xl">Book a Lesson</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Select an available slot to schedule a training session.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setSelectedDate(d => new Date(d!.getFullYear(), d!.getMonth() - 1, 1))} className="p-2 rounded-full hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">&lt;</button>
                <h2 className="text-xl font-bold dark:text-white">{selectedDate?.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => setSelectedDate(d => new Date(d!.getFullYear(), d!.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 dark:text-gray-400">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
                {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                {daysInMonth.map(day => (
                    <div key={day.toString()} 
                         onClick={() => setSelectedDate(day)}
                         className={`p-2 text-center cursor-pointer rounded-full transition-colors text-gray-700 dark:text-gray-300 ${selectedDate?.toDateString() === day.toDateString() ? 'bg-tyga-primary text-white' : 'hover:bg-tyga-light dark:hover:bg-gray-800'}`}>
                        {day.getDate()}
                    </div>
                ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-tyga-dark dark:text-white">Schedule for {selectedDate?.toDateString()}</h3>
            
            {isBookingConfirmed && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-300 rounded-lg" role="alert">
                    <span className="font-medium">Booking request sent!</span> Your lesson is pending approval from the coach.
                </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="student" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student</label>
                <select id="student" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-tyga-primary focus:border-tyga-primary sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                  {MOCK_STUDENTS.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
                </select>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Time Slots</p>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map(time => {
                    const booked = selectedDate ? isSlotBooked(selectedDate, time) : false;
                    return (
                      <button 
                        key={time} 
                        onClick={() => !booked && setSelectedTime(time)}
                        disabled={booked}
                        className={`p-2 rounded-md text-sm transition-colors ${
                          booked ? 'bg-red-200 text-red-700 dark:bg-red-900/50 dark:text-red-400 cursor-not-allowed' : 
                          selectedTime === time ? 'bg-tyga-secondary text-white' : 'bg-gray-100 hover:bg-tyga-secondary/20 dark:bg-gray-700 dark:text-white dark:hover:bg-tyga-secondary/20'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>
              
              <button onClick={handleBooking} disabled={!selectedTime || !selectedStudent} className="w-full bg-tyga-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400">
                Request Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPage;