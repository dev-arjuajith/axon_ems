import React from 'react';
import './DashboardHome.css';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import officeInterior from '../../assets/office_interior.png';
import { useNavigate } from 'react-router-dom';


// --- Mock Data ---
const mockData = {
  user: {
    firstName: "Alex",
    fullName: "Alex Rivera",
    role: "JUNIOR EMPLOYEE",
    avatarUrl: "https://i.pravatar.cc/150?u=alex"
  },
  greeting: "MORNING",
  summary: "You have 3 tasks pending for today and an upcoming team sync at 2:00 PM.",
  attendance: {
    currentTime: "09:12 AM",
    shiftStart: "09:00 AM",
    status: "Currently Out of Office"
  },
  holidays: [
    { dateFull: "OCT 14", month: "OCT", day: "14", name: "Indigenous Peoples' Day", type: "National Holiday" },
    { dateFull: "NOV 11", month: "NOV", day: "11", name: "Veterans Day", type: "Regional Holiday" }
  ],
  update: {
    title: "Quarterly Town Hall: Building Our Future Together",
    description: "Join us this Friday as our CEO discusses the new strategic roadmap and our move to the new Axon Meridian headquarters.",
    author: "Sarah Jenkins",
    authorRole: "HR Director",
    authorAvatar: "https://i.pravatar.cc/150?u=sarah",
    tag: "NEW UPDATE"
  },
  stats: {
    leavesTaken: 4,
    totalLeaves: 12,
    attendanceRate: "98.4%"
  },
  learning: {
    title: "Training & Growth",
    description: "As a Junior Associate, you are eligible for the Axon Meridian Leadership Program. Start your first module today to fast-track your career progression."
  }
};

// --- Icons ---
const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const HelpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default function DashboardHome() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-home">
      {/* Top Header */}
      <div className="dh-header">
        <Text size={12} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>
          {mockData.greeting}, {mockData.user.firstName.toUpperCase()}
        </Text>
        <div className="dh-header-right">
          <div className="icon-btn">
            <BellIcon />
            <span className="badge"></span>
          </div>
          <div className="icon-btn"><HelpIcon /></div>
          <div className="icon-btn"><SettingsIcon /></div>
          <div className="user-profile" onClick={() => navigate('/profile')}>
            <div className="user-info">
              <Text size={14} weight="bold">{mockData.user.fullName}</Text>
              <Text size={10} color="#6B7280" weight="bold" style={{ letterSpacing: '0.5px' }}>{mockData.user.role}</Text>
            </div>
            <img src={mockData.user.avatarUrl} alt="avatar" className="avatar" />
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="dh-welcome">
        <Text size={36} weight="800" color="#0F172A">Welcome back, {mockData.user.firstName}.</Text>
        <SizedBox height={8} />
        <Text size={16} color="#6B7280">{mockData.summary}</Text>
      </div>

      <SizedBox height={32} />

      {/* Main Grid Layout */}
      <div className="dh-grid">
        {/* Left Column */}
        <div className="dh-col-left">
          {/* Attendance Card */}
          <div className="card attendance-card">
            <div className="card-header">
              <Text size={12} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>ATTENDANCE CONTROL</Text>
              <div className="clock-bg"><ClockIcon /></div>
            </div>
            <Text size={40} weight="bold" color="#0F172A">{mockData.attendance.currentTime}</Text>
            <Text size={12} color="#6B7280">Current Shift Start: {mockData.attendance.shiftStart}</Text>
            <SizedBox height={24} />
            <button className="btn-clock-in">
              <PlayIcon />
              Clock In Now
            </button>
            <SizedBox height={16} />
            <Text size={10} color="#9CA3AF" align="center" style={{ display: 'block' }}>Status: {mockData.attendance.status}</Text>
          </div>

          {/* Upcoming Holidays */}
          <div className="card holidays-card">
            <div className="card-header" style={{ marginBottom: '16px' }}>
              <Text size={14} weight="bold" color="#0F172A">Upcoming Holidays</Text>
              <CalendarIcon />
            </div>
            <div className="holidays-list">
              {mockData.holidays.map((holiday, i) => (
                <div key={i} className="holiday-item">
                  <div className={`date-badge ${i === 0 ? 'date-badge-orange' : 'date-badge-blue'}`}>
                    <Text size={10} weight="bold">{holiday.month}</Text>
                    <Text size={16} weight="bold">{holiday.day}</Text>
                  </div>
                  <div className="holiday-info">
                    <Text size={14} weight="bold" color="#0F172A">{holiday.name}</Text>
                    <Text size={12} color="#6B7280">{holiday.type}</Text>
                  </div>
                </div>
              ))}
            </div>
            <SizedBox height={16} />
            <Text size={12} weight="bold" color="#001E40" align="center" style={{ display: 'block', cursor: 'pointer' }}>View All Calendar</Text>
          </div>
        </div>

        {/* Right Column */}
        <div className="dh-col-right">
          {/* Town Hall Card */}
          <div className="card townhall-card">
            <div className="th-image" style={{ backgroundImage: `url(${officeInterior})` }}>
              <span className="th-tag">{mockData.update.tag}</span>
            </div>
            <div className="th-content">
              <Text size={20} weight="bold" color="#0F172A">{mockData.update.title}</Text>
              <SizedBox height={16} />
              <Text size={14} color="#6B7280" style={{ lineHeight: '1.5' }}>{mockData.update.description}</Text>
              <div className="th-footer">
                <div className="th-author">
                  <img src={mockData.update.authorAvatar} alt="author" />
                  <div>
                    <Text size={12} weight="bold" color="#0F172A">{mockData.update.author}</Text>
                    <Text size={10} color="#6B7280">{mockData.update.authorRole}</Text>
                  </div>
                </div>
                <div className="th-read-more">
                  <Text size={12} weight="bold" color="#0F172A">Read More</Text>
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            {/* Leaves Taken */}
            <div className="card stat-card">
              <div className="stat-icon-wrapper bg-blue-100">
                <CheckCircleIcon />
              </div>
              <div className="stat-info">
                <Text size={10} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>LEAVES TAKEN</Text>
                <div>
                  <Text size={24} weight="bold" color="#0F172A">0{mockData.stats.leavesTaken}</Text>
                  <Text size={16} weight="bold" color="#9CA3AF"> / {mockData.stats.totalLeaves} </Text>
                  <Text size={12} color="#9CA3AF">Days</Text>
                </div>
              </div>
            </div>

            {/* Attendance Rate */}
            <div className="card stat-card">
              <div className="stat-icon-wrapper bg-blue-100">
                <TrendUpIcon />
              </div>
              <div className="stat-info">
                <Text size={10} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>ATTENDANCE RATE</Text>
                <Text size={24} weight="bold" color="#0F172A">{mockData.stats.attendanceRate}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Bottom Card */}
      <SizedBox height={24} />
      <div className="card learning-card">
        <div className="learning-content">
          <Text size={24} weight="bold" color="white">{mockData.learning.title}</Text>
          <SizedBox height={16} />
          <Text size={14} color="#D1D5DB" style={{ maxWidth: '60%', lineHeight: '1.5' }}>
            {mockData.learning.description}
          </Text>
          <SizedBox height={24} />
          <button className="btn-learning">Launch Learning Hub</button>
        </div>
        <button className="btn-plus">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
