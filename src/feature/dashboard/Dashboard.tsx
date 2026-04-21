import { useState } from 'react'
import './Dashboard.css';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import dashboardLogo from '../../assets/dashboard.svg';
import attendanceLogo from '../../assets/attendance.svg';
import leaveLogo from '../../assets/leave_request.svg';
import profileLogo from '../../assets/profile.svg';
import supportLogo from '../../assets/support.svg';
import LogoutLogo from '../../assets/logout.svg';
import { useParams, useNavigate } from 'react-router-dom';
import NavCard from './NavCard';
import Profile from '../profile/Profile';
import Leave from '../leave/Leave';

function Dashboard() {

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardLogo },
    { id: "attendance", label: "Attendance", icon: attendanceLogo },
    { id: "leave", label: "Leave Request", icon: leaveLogo },
    { id: "profile", label: "My Profile", icon: profileLogo },
    { id: "support", label: "Support", icon: supportLogo },
    { id: "logout", label: "Logout", icon: LogoutLogo },
  ];
  const { tabId } = useParams();
  const navigate = useNavigate();
  const activeNav = tabId || "dashboard";
  const activeNavObj = navItems.find((item) => item.id === activeNav) || navItems[0];
  return (
    <div style={{display: "flex", width: '100%', minHeight: '100vh', margin: '0px'}}>
      <div className='drawer-container'>
        <Text size={24} weight='700'> Axon EMS</Text>
        <SizedBox height={32}></SizedBox>
        <div className="nav-group">
          {navItems.map((item) => (
            <NavCard
              key={item.id}
              text={item.label}
              logo={item.icon}
              isSelected={activeNav === item.id}
              onClick={() => navigate(`/${item.id}`)}
            />
          ))}
        </div>
        <SizedBox height={32}></SizedBox>
        <div className='role-card' style={{padding: '16px', backgroundColor: '#ECEEF0'}}>
          <Text size={12} weight='bold'> Junior Associate</Text>
          <SizedBox height={4}></SizedBox>
          <Text size={10} weight='normal' >Logged in for 4h 12m</Text>
        </div>

      </div>
      <div className='content-container' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '24px' }}>
          <Text size={24} weight='bold'>{activeNavObj.label}</Text>
        </div>
        <div style={{ flex: 1 }}>
          {activeNav === 'profile' ? <Profile /> : activeNav === 'leave' ? <Leave /> : activeNav}
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard