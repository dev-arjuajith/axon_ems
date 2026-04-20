import { useState } from 'react'
import './Dashboard.css';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import dashboardLogo from '../../assets/dashboard.svg';
import attendanceLogo from '../../assets/attendance.svg';
import leaveLogo from '../../assets/leave_request.svg';
import profileLogo from '../../assets/profile.svg';
import supportLogo from '../../assets/support.svg';
import LogoutLogo from '../../assets/logout.svg';
import NavCard from './NavCard';

function Dashboard() {

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardLogo },
    { id: "attendance", label: "Attendance", icon: attendanceLogo },
    { id: "leave", label: "Leave Request", icon: leaveLogo },
    { id: "profile", label: "My Profile", icon: profileLogo },
    { id: "support", label: "Support", icon: supportLogo },
    { id: "logout", label: "Logout", icon: LogoutLogo },
  ];
  
  const [activeNav, setActiveNav] = useState("dashboard");
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
              onClick={() => setActiveNav(item.id)}
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
      <div className='content-container'>
        {activeNav}
      </div>
    </div>
    
  )
}

export default Dashboard