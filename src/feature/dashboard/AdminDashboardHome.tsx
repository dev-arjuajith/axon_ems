import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';

const mockAdminData = {
  user: {
    firstName: "Admin",
    fullName: "System Administrator",
    role: "ADMINISTRATOR",
    avatarUrl: "https://i.pravatar.cc/150?u=admin"
  },
  greeting: "HELLO",
  summary: "There are 5 pending leave requests and 2 new employee registrations requiring your review.",
  stats: {
    totalEmployees: 48,
    onLeaveToday: 4,
    attendanceRate: "94.2%",
    pendingRequests: 5
  },
  recentActivities: [
    { id: 1, user: "Alex Rivera", action: "Submitted leave request", time: "2h ago" },
    { id: 2, user: "Sarah Jenkins", action: "Updated department details", time: "4h ago" },
    { id: 3, user: "John Doe", action: "Clocked in late", time: "5h ago" }
  ]
};

// Icons (Same as DashboardHome)
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

  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const FileTextIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

export default function AdminDashboardHome() {
  return (
    <div className="dashboard-home">
      {/* Top Header */}
      <div className="dh-header">
        <Text size={12} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>
          {mockAdminData.greeting}, {mockAdminData.user.firstName.toUpperCase()}
        </Text>
        <div className="dh-header-right">
          <div className="icon-btn">
            <BellIcon />
            <span className="badge"></span>
          </div>
          <div className="icon-btn"><HelpIcon /></div>
          <div className="icon-btn"><SettingsIcon /></div>
          <div className="user-profile">
            <div className="user-info">
              <Text size={14} weight="bold">{mockAdminData.user.fullName}</Text>
              <Text size={10} color="#6B7280" weight="bold" style={{ letterSpacing: '0.5px' }}>{mockAdminData.user.role}</Text>
            </div>
            <img src={mockAdminData.user.avatarUrl} alt="avatar" className="avatar" />
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="dh-welcome">
        <Text size={36} weight="800" color="#0F172A">Admin Overview.</Text>
        <SizedBox height={8} />
        <Text size={16} color="#6B7280">{mockAdminData.summary}</Text>
      </div>

      <SizedBox height={32} />

      {/* Main Grid Layout */}
      <div className="dh-grid">
        {/* Left Column: Stats */}
        <div className="dh-col-left">
          <div className="card stat-card" style={{ marginBottom: '16px' }}>
            <div className="stat-icon-wrapper bg-blue-100">
              <UsersIcon />
            </div>
            <div className="stat-info">
              <Text size={10} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>TOTAL EMPLOYEES</Text>
              <Text size={24} weight="bold" color="#0F172A">{mockAdminData.stats.totalEmployees}</Text>
            </div>
          </div>

          <div className="card stat-card" style={{ marginBottom: '16px' }}>
            <div className="stat-icon-wrapper bg-blue-100">
              <FileTextIcon />
            </div>
            <div className="stat-info">
              <Text size={10} weight="bold" color="#6B7280" style={{ letterSpacing: '1px' }}>PENDING REQUESTS</Text>
              <Text size={24} weight="bold" color="#F59E0B">{mockAdminData.stats.pendingRequests}</Text>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="dh-col-right">
            <div className="card" style={{ padding: '24px' }}>
                <Text size={16} weight="bold" color="#0F172A">Recent Activity</Text>
                <SizedBox height={16} />
                <div className="activity-list">
                    {mockAdminData.recentActivities.map(activity => (
                        <div key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                            <div>
                                <Text size={14} weight="bold" color="#0F172A">{activity.user}</Text>
                                <SizedBox height={4} />
                                <Text size={12} color="#6B7280">{activity.action}</Text>
                            </div>
                            <Text size={12} color="#9CA3AF">{activity.time}</Text>
                        </div>
                    ))}
                </div>
                <SizedBox height={16} />
                <Text size={12} weight="bold" color="#2563EB" cursor="pointer">View All Activity</Text>
            </div>
        </div>
      </div>
    </div>
  );
}
