import React, { useState } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import {
  attendanceLogs,
  upcomingHolidays,
  activeRequests,
  attendanceStats,
  type AttendanceStatus,
} from './attendanceData';
import './Attendance.css';

const statusBadgeClass: Record<AttendanceStatus, string> = {
  'ON TIME': 'badge-on-time',
  'LATE IN': 'badge-late-in',
  'WFH':     'badge-wfh',
  'LEAVE':   'badge-leave',
  'HOLIDAY': 'badge-holiday',
  'ABSENT':  'badge-absent',
};

const Attendance: React.FC = () => {
  const [monthIndex, setMonthIndex] = useState(0);
  const currentLog = attendanceLogs[monthIndex];

  return (
    <div className="attendance-container">

      {/* Stats Row */}
      <div className="stats-row">
        {/* Attendance Rate */}
        <div className="stat-card">
          <Text size={12} weight="600" color={AppColors.text.secondary}>Attendance Rate</Text>
          <p className="stat-value">{attendanceStats.attendanceRate}</p>
          <span className="improvement-badge">↗ {attendanceStats.attendanceImprovement}</span>
        </div>

        {/* Leaves Remaining */}
        <div className="stat-card">
          <Text size={12} weight="600" color={AppColors.text.secondary}>Leaves Remaining</Text>
          <p className="stat-value">{attendanceStats.leavesRemaining} Days</p>
          <div className="leave-progress">
            <div
              className="leave-progress-fill"
              style={{ width: `${(attendanceStats.leavesRemaining / attendanceStats.leavesTotal) * 100}%` }}
            />
          </div>
        </div>

        {/* Average Check-in */}
        <div className="stat-card">
          <Text size={12} weight="600" color={AppColors.text.secondary}>Average Check-in</Text>
          <p className="stat-value">{attendanceStats.avgCheckIn}</p>
          <Text size={12} color={AppColors.text.secondary}>Target: {attendanceStats.targetCheckIn}</Text>
        </div>

        {/* Upcoming Holiday */}
        <div className="stat-card dark">
          <Text size={11} weight="600" color="#94A3B8">Upcoming Holiday</Text>
          <p className="stat-value light">{attendanceStats.upcomingHoliday.name}</p>
          <Text size={12} color="#94A3B8">{attendanceStats.upcomingHoliday.dateRange}</Text>
        </div>
      </div>

      {/* Main Content */}
      <div className="attendance-main">

        {/* Log Table */}
        <div className="log-card">
          <div className="log-card-header">
            <div>
              <Text size={20} weight="bold" color={AppColors.text.primary}>
                {currentLog.month} {currentLog.year} Log
              </Text>
              <SizedBox height={4} />
              <Text size={13} color={AppColors.text.secondary}>
                Review your daily entry and exit times
              </Text>
            </div>
            <div className="log-nav-btns">
              <button
                className="log-nav-btn"
                onClick={() => setMonthIndex(i => Math.min(i + 1, attendanceLogs.length - 1))}
                disabled={monthIndex === attendanceLogs.length - 1}
              >
                ‹
              </button>
              <button
                className="log-nav-btn"
                onClick={() => setMonthIndex(i => Math.max(i - 1, 0))}
                disabled={monthIndex === 0}
              >
                ›
              </button>
            </div>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentLog.records.map((record, i) => (
                <tr key={i}>
                  <td>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>{record.duration}</td>
                  <td>
                    <span className={`status-badge ${statusBadgeClass[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column */}
        <div className="right-column">

          {/* Upcoming Holidays */}
          <div className="side-card">
            <Text size={18} weight="bold" color={AppColors.text.primary}>Upcoming Holidays</Text>
            <SizedBox height={12} />
            {upcomingHolidays.slice(0, 3).map((h, i) => (
              <div key={i} className="holiday-item">
                <div className="holiday-date-box">
                  <Text size={10} weight="700" color="#4F46E5">{h.month}</Text>
                  <Text size={18} weight="700" color="#001E40">{h.day}</Text>
                </div>
                <div style={{ flex: 1 }}>
                  <Text size={14} weight="bold" color={AppColors.text.primary}>{h.name}</Text>
                  <SizedBox height={2} />
                  <Text size={12} color={AppColors.text.secondary}>{h.type}</Text>
                </div>
              </div>
            ))}
            <button className="view-all-btn">View All 2024 Holidays</button>
          </div>

          {/* Active Requests */}
          <div className="side-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text size={18} weight="bold" color={AppColors.text.primary}>Active Requests</Text>
              <span className="request-count-badge">{String(activeRequests.length).padStart(2, '0')}</span>
            </div>
            <SizedBox height={14} />
            {activeRequests.map((req, i) => (
              <div
                key={i}
                className="request-item"
                style={{ borderLeftColor: req.color }}
              >
                <Text size={10} weight="700" color={AppColors.text.secondary} letterSpacing={0.5}>
                  {req.category} • {req.type}
                </Text>
                <SizedBox height={4} />
                <Text size={16} weight="bold" color={AppColors.text.primary}>{req.dateRange}</Text>
                <SizedBox height={4} />
                <Text size={12} weight="600" color={req.color}>{req.approvalStatus}</Text>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Attendance;
