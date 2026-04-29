import React, { useState, useRef, useEffect } from 'react';
import './Profile.css';
import Text from '../../components/Text';
import PrimaryButton from '../../components/PrimaryButton';
import SizedBox from '../../components/SizedBox';
import { getProfileApi, updateProfileApi } from '../../core/api';

interface Manager {
  name: string;
  role: string;
  avatar: string | null;
}

interface PersonalDetails {
  dateOfJoining: string;
  department: string;
  phoneNumber: string;
  personalEmail: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}

interface WorkAccess {
  type: string;
  value: string;
  level: string;
  icon: string;
}

interface LeaveBalance {
  leaveType: string;
  total: number;
  used: number;
}

interface ProfileData {
  id: string;
  name: string;
  role: string;
  department: string;
  joinedDate: string;
  avatar: string | null;
  reportsTo: Manager | null;
  personalDetails: PersonalDetails;
  workAccess: WorkAccess[];
  leaveBalance: LeaveBalance[];
}

const Profile: React.FC = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfileApi();
      if (response.success) {
        setData(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5 MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => prev ? { ...prev, avatar: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof PersonalDetails, value: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        personalDetails: { ...prev.personalDetails, [field]: value }
      };
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (field: 'phoneNumber' | 'emergencyContactNumber', value: string) => {
    const formattedValue = value.replace(/[^\d\s\-\+\(\)]/g, '');
    handleInputChange(field, formattedValue);
  };

  const validate = () => {
    if (!data) return false;
    const newErrors: Record<string, string> = {};
    const { phoneNumber, personalEmail, emergencyContactName, emergencyContactNumber } = data.personalDetails;
    
    if (!phoneNumber?.trim()) {
      newErrors.phoneNumber = "Required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone format";
    }

    if (!personalEmail?.trim()) {
      newErrors.personalEmail = "Required";
    } else if (!/^\S+@\S+\.\S+$/.test(personalEmail)) {
      newErrors.personalEmail = "Invalid email format";
    }

    if (!emergencyContactName?.trim()) newErrors.emergencyContactName = "Required";
    
    if (!emergencyContactNumber?.trim()) {
      newErrors.emergencyContactNumber = "Required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(emergencyContactNumber)) {
      newErrors.emergencyContactNumber = "Invalid phone format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleEdit = async () => {
    if (isEditing) {
      if (validate() && data) {
        try {
          const updateDto = {
            phoneNumber: data.personalDetails.phoneNumber,
            personalEmail: data.personalDetails.personalEmail,
            emergencyContactName: data.personalDetails.emergencyContactName,
            emergencyContactNumber: data.personalDetails.emergencyContactNumber
          };
          const response = await updateProfileApi(updateDto);
          if (response.success) {
            setData(response.data);
            setIsEditing(false);
          }
        } catch (err: any) {
          alert(err.message || "Failed to update profile");
        }
      }
    } else {
      setIsEditing(true);
    }
  };

  if (loading) return <div className="profile-container"><Text>Loading profile...</Text></div>;
  if (error) return <div className="profile-container"><Text color="red">{error}</Text></div>;
  if (!data) return <div className="profile-container"><Text>No profile data found</Text></div>;

  const defaultAvatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80";
  const defaultManagerAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80";

  return (
    <div className="profile-container">
      {/* Top Banner Card */}
      <div className="profile-header-card">
        <div className="profile-header-left">
          <div className="avatar-wrapper">
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleAvatarChange} 
            />
            <img src={data.avatar || defaultAvatar} alt="Profile" className="profile-avatar" />
            {isEditing && (
              <div className="camera-icon" onClick={() => fileInputRef.current?.click()}>📷</div>
            )}
          </div>
          <div className="profile-info-main">
            <div className="name-badge-row">
              <Text size="24px" weight="bold">{data.name}</Text>
              <div className="badge-tag">{data.id}</div>
            </div>
            <SizedBox height={4} />
            <Text size="16px" color="#505F76" weight="600">{data.role || "N/A"}</Text>
            <SizedBox height={16} />
            <div className="info-row">
              <span className="icon">🏢</span>
              <Text size="14px" color="#505F76">{data.department || "N/A"}</Text>
            </div>
            <SizedBox height={8} />
            <div className="info-row">
              <span className="icon">📅</span>
              <Text size="14px" color="#505F76">Joined {data.joinedDate || "N/A"}</Text>
            </div>
          </div>
        </div>

        {data.reportsTo && (
          <div className="reports-to-card">
            <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">REPORTS TO</Text>
            <SizedBox height={12} />
            <div className="manager-info">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={data.reportsTo.avatar || defaultManagerAvatar} alt="Manager" className="manager-avatar" />
                <div style={{ marginLeft: '12px' }}>
                  <Text size="14px" weight="bold">{data.reportsTo.name}</Text>
                  <Text size="12px" color="#64748B">{data.reportsTo.role || "N/A"}</Text>
                </div>
              </div>
              <div className="chat-icon">💬</div>
            </div>
          </div>
        )}
      </div>

      <div className="profile-content-grid">
        {/* Left Column: Personal Details */}
        <div className="personal-details-card">
          <div className="card-header-row">
            <Text size="20px" weight="bold">Personal Details</Text>
            <Text size="12px" color="#9CA3AF">Last updated: Just now</Text>
          </div>
          <SizedBox height={24} />
          
          <div className="form-grid">
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">DATE OF JOINING</Text>
              <SizedBox height={8} />
              <div 
                className="input-field" 
                style={isEditing ? { backgroundColor: '#F1F5F9', color: '#9CA3AF', cursor: 'not-allowed' } : {}}
              >
                {data.personalDetails.dateOfJoining || "-"}
              </div>
            </div>
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">DEPARTMENT</Text>
              <SizedBox height={8} />
              <div 
                className="input-field" 
                style={isEditing ? { backgroundColor: '#F1F5F9', color: '#9CA3AF', cursor: 'not-allowed' } : {}}
              >
                {data.personalDetails.department || "-"}
              </div>
            </div>
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">PHONE NUMBER</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <>
                  <input type="tel" className="input-field full-width" style={errors.phoneNumber ? { borderColor: 'red' } : {}} value={data.personalDetails.phoneNumber || ""} onChange={(e) => handlePhoneChange('phoneNumber', e.target.value)} />
                  {errors.phoneNumber && <div style={{ color: 'red', fontSize: '10px', marginTop: '4px' }}>{errors.phoneNumber}</div>}
                </>
              ) : (
                <div className="input-field">{data.personalDetails.phoneNumber || "-"}</div>
              )}
            </div>
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">PERSONAL EMAIL</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <>
                  <input type="email" className="input-field full-width" style={errors.personalEmail ? { borderColor: 'red' } : {}} value={data.personalDetails.personalEmail || ""} onChange={(e) => handleInputChange('personalEmail', e.target.value)} />
                  {errors.personalEmail && <div style={{ color: 'red', fontSize: '10px', marginTop: '4px' }}>{errors.personalEmail}</div>}
                </>
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
                <>
                  <input className="input-field full-width" style={errors.emergencyContactName ? { borderColor: 'red' } : {}} value={data.personalDetails.emergencyContactName || ""} onChange={(e) => handleInputChange('emergencyContactName', e.target.value)} />
                  {errors.emergencyContactName && <div style={{ color: 'red', fontSize: '10px', marginTop: '4px' }}>{errors.emergencyContactName}</div>}
                </>
              ) : (
                <div className="input-field">{data.personalDetails.emergencyContactName || "-"}</div>
              )}
            </div>
            
            <div className="form-group">
              <Text size="10px" weight="bold" color="#64748B" letterSpacing="1px">MOBILE NUMBER</Text>
              <SizedBox height={8} />
              {isEditing ? (
                <>
                  <input type="tel" className="input-field full-width" style={errors.emergencyContactNumber ? { borderColor: 'red' } : {}} value={data.personalDetails.emergencyContactNumber || ""} onChange={(e) => handlePhoneChange('emergencyContactNumber', e.target.value)} />
                  {errors.emergencyContactNumber && <div style={{ color: 'red', fontSize: '10px', marginTop: '4px' }}>{errors.emergencyContactNumber}</div>}
                </>
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
            
            {data.workAccess.map((access, index) => (
              <React.Fragment key={index}>
                <div className="access-item">
                  <div className="access-icon-wrapper">{access.icon}</div>
                  <div className="access-info">
                    <Text size="14px" weight="bold">{access.type === 'BADGE' ? 'Badge Access' : 'Git Account'}</Text>
                    <Text size="12px" color="#64748B">{access.level || access.value}</Text>
                  </div>
                </div>
                {index < data.workAccess.length - 1 && <SizedBox height={16} />}
              </React.Fragment>
            ))}
            {data.workAccess.length === 0 && <Text size="14px" color="#64748B">No work access data</Text>}
          </div>

          <div className="leave-balance-card">
            <div className="card-header-row">
              <Text size="18px" weight="bold">Leave Balance</Text>
              <div className="year-tag">{new Date().getFullYear()}</div>
            </div>
            <SizedBox height={24} />
            
            {data.leaveBalance.map((leave, index) => (
              <React.Fragment key={index}>
                <div className="leave-item">
                  <div className="leave-header">
                    <Text size="12px" weight="600" color="#505F76">{leave.leaveType}</Text>
                    <Text size="12px" weight="bold">{leave.used} / {leave.total} Days</Text>
                  </div>
                  <SizedBox height={8} />
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${(leave.used / leave.total) * 100}%` }}
                    />
                  </div>
                </div>
                {index < data.leaveBalance.length - 1 && <SizedBox height={20} />}
              </React.Fragment>
            ))}
            {data.leaveBalance.length === 0 && <Text size="14px" color="#64748B">No leave balance data</Text>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
