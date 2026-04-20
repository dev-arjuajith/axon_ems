import React, { useState } from 'react';
import './Profile.css';
import Text from '../../components/Text';
import PrimaryButton from '../../components/PrimaryButton';
import SizedBox from '../../components/SizedBox';

const profileData = {
  id: "AX-1024",
  name: "Alex Sterling",
  role: "Junior Developer",
  department: "Engineering Department",
  joinedDate: "June 12, 2023",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80",
  reportsTo: {
    name: "Sarah Jenkins",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
  },
  personalDetails: {
    dateOfJoining: "June 12, 2023",
    department: "Engineering",
    phoneNumber: "+1 (555) 012-3456",
    personalEmail: "alex.sterling@email.com",
    emergencyContactName: "Robert Sterling (Father)",
    emergencyContactNumber: "+1 (555) 999-8888",
  },
  workAccess: {
    badgeAccess: { level: "Level 1 - Engineering", icon: "🗝️" },
    gitAccount: { username: "alex_axon_dev", icon: "💻" }
  },
  leaveBalance: {
    vacationDays: { total: 15, used: 12 },
    sickLeave: { total: 5, used: 5 }
  }
};

const Profile: React.FC = () => {
  const [data, setData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof typeof data.personalDetails, value: string) => {
    setData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: value }
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      {/* Top Banner Card */}
      <div className="profile-header-card">
        <div className="profile-header-left">
          <div className="avatar-wrapper">
            <img src={profileData.avatar} alt="Profile" className="profile-avatar" />
            <div className="camera-icon">📷</div>
          </div>
          <div className="profile-info-main">
            <div className="name-badge-row">
              <Text size="24px" weight="bold">{data.name}</Text>
              <div className="badge-tag">{data.id}</div>
            </div>
            <SizedBox height={4} />
            <Text size="16px" color="#505F76" weight="600">{data.role}</Text>
            <SizedBox height={16} />
            <div className="info-row">
              <span className="icon">🏢</span>
              <Text size="14px" color="#505F76">{data.department}</Text>
            </div>
            <SizedBox height={8} />
            <div className="info-row">
              <span className="icon">📅</span>
              <Text size="14px" color="#505F76">Joined {data.joinedDate}</Text>
            </div>
          </div>
        </div>

        <div className="reports-to-card">
          <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">REPORTS TO</Text>
          <SizedBox height={12} />
          <div className="manager-info">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={profileData.reportsTo.avatar} alt="Manager" className="manager-avatar" />
              <div style={{ marginLeft: '12px' }}>
                <Text size="14px" weight="bold">{profileData.reportsTo.name}</Text>
                <Text size="12px" color="#64748B">{profileData.reportsTo.role}</Text>
              </div>
            </div>
            <div className="chat-icon">💬</div>
          </div>
        </div>
      </div>

      <div className="profile-content-grid">
        {/* Left Column: Personal Details */}
        <div className="personal-details-card">
          <div className="card-header-row">
            <Text size="20px" weight="bold">Personal Details</Text>
            <Text size="12px" color="#9CA3AF">Last updated: 2 days ago</Text>
          </div>
          <SizedBox height={24} />
          
          <div className="form-grid">
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">DATE OF JOINING</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <input className="input-field full-width" value={data.personalDetails.dateOfJoining} onChange={(e) => handleInputChange('dateOfJoining', e.target.value)} />
              ) : (
                <div className="input-field">{data.personalDetails.dateOfJoining || "-"}</div>
              )}
            </div>
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">DEPARTMENT</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <input className="input-field full-width" value={data.personalDetails.department} onChange={(e) => handleInputChange('department', e.target.value)} />
              ) : (
                <div className="input-field">{data.personalDetails.department || "-"}</div>
              )}
            </div>
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">PHONE NUMBER</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <input className="input-field full-width" value={data.personalDetails.phoneNumber} onChange={(e) => handleInputChange('phoneNumber', e.target.value)} />
              ) : (
                <div className="input-field">{data.personalDetails.phoneNumber || "-"}</div>
              )}
            </div>
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">PERSONAL EMAIL</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <input className="input-field full-width" value={data.personalDetails.personalEmail} onChange={(e) => handleInputChange('personalEmail', e.target.value)} />
              ) : (
                <div className="input-field">{data.personalDetails.personalEmail || "-"}</div>
              )}
            </div>
          </div>
          
          <SizedBox height={24} />
          <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">EMERGENCY CONTACT</Text>
          <SizedBox height={16} />
          
          <div className="form-grid">
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">NAME & RELATION</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <input className="input-field full-width" value={data.personalDetails.emergencyContactName} onChange={(e) => handleInputChange('emergencyContactName', e.target.value)} />
              ) : (
                <div className="input-field">{data.personalDetails.emergencyContactName || "-"}</div>
              )}
            </div>
            
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">MOBILE NUMBER</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <input className="input-field full-width" value={data.personalDetails.emergencyContactNumber} onChange={(e) => handleInputChange('emergencyContactNumber', e.target.value)} />
              ) : (
                <div className="input-field">{data.personalDetails.emergencyContactNumber || "-"}</div>
              )}
            </div>
          </div>

          <SizedBox height={32} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <div style={{ width: '200px' }}>
              <PrimaryButton text={isEditing ? "Save Profile Changes" : "Edit Profile"} onClick={toggleEdit} />
            </div>
          </div>
        </div>

        {/* Right Column: Work Access & Leave Balance */}
        <div className="right-column">
          <div className="work-access-card">
            <Text size="18px" weight="bold">Work Access</Text>
            <SizedBox height={24} />
            
            <div className="access-item">
              <div className="access-icon-wrapper">{profileData.workAccess.badgeAccess.icon}</div>
              <div className="access-info">
                <Text size="14px" weight="bold">Badge Access</Text>
                <Text size="12px" color="#64748B">{profileData.workAccess.badgeAccess.level}</Text>
              </div>
            </div>
            
            <SizedBox height={16} />
            
            <div className="access-item">
              <div className="access-icon-wrapper">{profileData.workAccess.gitAccount.icon}</div>
              <div className="access-info">
                <Text size="14px" weight="bold">Git Account</Text>
                <Text size="12px" color="#64748B">{profileData.workAccess.gitAccount.username}</Text>
              </div>
            </div>
          </div>

          <div className="leave-balance-card">
            <div className="card-header-row">
              <Text size="18px" weight="bold">Leave Balance</Text>
              <div className="year-tag">2024</div>
            </div>
            <SizedBox height={24} />
            
            <div className="leave-item">
              <div className="leave-header">
                <Text size="12px" weight="600" color="#505F76">Vacation Days</Text>
                <Text size="12px" weight="bold">{profileData.leaveBalance.vacationDays.used} / {profileData.leaveBalance.vacationDays.total} Days</Text>
              </div>
              <SizedBox height={8} />
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(profileData.leaveBalance.vacationDays.used / profileData.leaveBalance.vacationDays.total) * 100}%` }}
                />
              </div>
            </div>

            <SizedBox height={20} />

            <div className="leave-item">
              <div className="leave-header">
                <Text size="12px" weight="600" color="#505F76">Sick Leave</Text>
                <Text size="12px" weight="bold">{profileData.leaveBalance.sickLeave.used} / {profileData.leaveBalance.sickLeave.total} Days</Text>
              </div>
              <SizedBox height={8} />
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(profileData.leaveBalance.sickLeave.used / profileData.leaveBalance.sickLeave.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
