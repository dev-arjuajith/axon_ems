import React, { useState } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import './LeaveCalendar.css';

type DateStatus = 'wfh' | 'leave' | 'holiday' | 'selected' | null;

interface CalendarDate {
  date: number;
  status: DateStatus;
  month: 'current' | 'prev' | 'next';
}

interface LeaveCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedDates: Date[], leaveType: string, reason: string) => void;
}

const LeaveCalendar: React.FC<LeaveCalendarProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [reason, setReason] = useState('');

  // Mock data for existing attendance
  const existingAttendance: Record<number, DateStatus> = {
    5: 'wfh',
    12: 'leave',
    19: 'wfh',
    25: 'holiday',
    26: 'holiday',
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getCalendarDates = (): CalendarDate[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const dates: CalendarDate[] = [];
    
    // Previous month dates
    for (let i = firstDay - 1; i >= 0; i--) {
      dates.push({
        date: daysInPrevMonth - i,
        status: null,
        month: 'prev'
      });
    }
    
    // Current month dates
    for (let i = 1; i <= daysInMonth; i++) {
      const status = selectedDates.includes(i) ? 'selected' : existingAttendance[i] || null;
      dates.push({
        date: i,
        status,
        month: 'current'
      });
    }
    
    // Next month dates
    const remainingDays = 42 - dates.length;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        date: i,
        status: null,
        month: 'next'
      });
    }
    
    return dates;
  };

  const handleDateClick = (date: CalendarDate) => {
    if (date.month !== 'current') return;
    
    const dateNum = date.date;
    if (selectedDates.includes(dateNum)) {
      setSelectedDates(selectedDates.filter(d => d !== dateNum));
    } else {
      setSelectedDates([...selectedDates, dateNum]);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDates([]);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDates([]);
  };

  const handleSubmit = () => {
    const dates = selectedDates.map(d => 
      new Date(currentDate.getFullYear(), currentDate.getMonth(), d)
    );
    onSubmit(dates, leaveType, reason);
    setSelectedDates([]);
    setReason('');
  };

  const getDateClassName = (date: CalendarDate) => {
    const classes = ['calendar-date'];
    if (date.month !== 'current') classes.push('other-month');
    if (date.status === 'selected') classes.push('selected');
    if (date.status === 'wfh') classes.push('wfh');
    if (date.status === 'leave') classes.push('leave');
    if (date.status === 'holiday') classes.push('holiday');
    return classes.join(' ');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <Text size={24} weight="bold" color={AppColors.text.primary}>
            Request Leave
          </Text>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <SizedBox height={24} />

        {/* Calendar Navigation */}
        <div className="calendar-header">
          <button className="nav-btn" onClick={handlePrevMonth}>‹</button>
          <Text size={18} weight="600" color={AppColors.text.primary}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <button className="nav-btn" onClick={handleNextMonth}>›</button>
        </div>

        <SizedBox height={16} />

        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-dot wfh-dot"></div>
            <Text size={12} color={AppColors.text.secondary}>WFH</Text>
          </div>
          <div className="legend-item">
            <div className="legend-dot leave-dot"></div>
            <Text size={12} color={AppColors.text.secondary}>Leave</Text>
          </div>
          <div className="legend-item">
            <div className="legend-dot holiday-dot"></div>
            <Text size={12} color={AppColors.text.secondary}>Holiday</Text>
          </div>
          <div className="legend-item">
            <div className="legend-dot selected-dot"></div>
            <Text size={12} color={AppColors.text.secondary}>Selected</Text>
          </div>
        </div>

        <SizedBox height={16} />

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {dayNames.map(day => (
            <div key={day} className="day-name">
              <Text size={12} weight="600" color={AppColors.text.secondary}>
                {day}
              </Text>
            </div>
          ))}
          {getCalendarDates().map((date, index) => (
            <div
              key={index}
              className={getDateClassName(date)}
              onClick={() => handleDateClick(date)}
            >
              <Text 
                size={14} 
                weight={date.status ? "600" : "normal"}
                color={date.month === 'current' ? AppColors.text.primary : AppColors.text.secondary}
              >
                {date.date}
              </Text>
            </div>
          ))}
        </div>

        <SizedBox height={24} />

        {/* Leave Type Selection */}
        <div>
          <Text size={14} weight="600" color={AppColors.text.primary}>
            Leave Type
          </Text>
          <SizedBox height={8} />
          <select 
            className="leave-type-select"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="WFH Request">WFH Request</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
        </div>

        <SizedBox height={16} />

        {/* Reason */}
        <div>
          <Text size={14} weight="600" color={AppColors.text.primary}>
            Reason
          </Text>
          <SizedBox height={8} />
          <textarea
            className="reason-textarea"
            placeholder="Enter reason for leave request..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
          />
        </div>

        <SizedBox height={24} />

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={selectedDates.length === 0 || !reason.trim()}
          >
            Submit Request ({selectedDates.length} {selectedDates.length === 1 ? 'day' : 'days'})
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
